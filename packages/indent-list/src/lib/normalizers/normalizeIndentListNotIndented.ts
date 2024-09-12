import {
  type TEditor,
  type TNodeEntry,
  isDefined,
  unsetNodes,
} from '@udecode/plate-common';
import { IndentPlugin } from '@udecode/plate-indent';

import {
  BaseIndentListPlugin,
  INDENT_LIST_KEYS,
} from '../BaseIndentListPlugin';

/** Unset IndentListPlugin.key, listStart if IndentPlugin.key is not defined. */
export const normalizeIndentListNotIndented = (
  editor: TEditor,
  [node, path]: TNodeEntry
) => {
  if (
    !isDefined(node[IndentPlugin.key]) &&
    (node[BaseIndentListPlugin.key] || node[INDENT_LIST_KEYS.listStart])
  ) {
    unsetNodes(editor, [BaseIndentListPlugin.key, INDENT_LIST_KEYS.listStart], {
      at: path,
    });

    return true;
  }
};
