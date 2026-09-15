import torch
from itertools import groupby


class Decode:
    """
    CTC decoder for MSLR gloss tokens.
    Falls back to greedy MaxDecode (ctcdecode not available on this system).
    """

    def __init__(self, gloss_dict, num_classes, search_mode="max", blank_id=0):
        self.i2g_dict = {int(k): v["gloss"] for k, v in gloss_dict["id2gloss"].items()}
        self.g2i_dict = {k: int(v["index"]) for k, v in gloss_dict["gloss2id"].items()}
        self.num_classes = num_classes
        self.search_mode = search_mode
        self.blank_id = blank_id

    def decode(self, nn_output, vid_lgt, batch_first=True, probs=False):
        if not batch_first:
            nn_output = nn_output.permute(1, 0, 2)
        return self.MaxDecode(nn_output, vid_lgt)

    def MaxDecode(self, nn_output, vid_lgt):
        """
        Greedy CTC decoding: argmax per timestep, collapse consecutive duplicates,
        filter blanks, collapse again.
        nn_output: (B, T, num_classes)
        vid_lgt: (B,) sequence lengths
        Returns: List[List[(gloss_str, idx)]]
        """
        index_list = torch.argmax(nn_output, axis=2)
        batchsize, lgt = index_list.shape
        ret_list = []

        for batch_idx in range(batchsize):
            group_result = [x[0] for x in groupby(index_list[batch_idx][: vid_lgt[batch_idx]])]
            filtered = [x for x in group_result if x != self.blank_id]

            if len(filtered) > 0:
                max_result = torch.stack(filtered)
                max_result = [x[0] for x in groupby(max_result)]
            else:
                max_result = filtered

            ret_list.append([(self.i2g_dict[int(gloss_id)], idx) for idx, gloss_id in enumerate(max_result)])

        return ret_list
