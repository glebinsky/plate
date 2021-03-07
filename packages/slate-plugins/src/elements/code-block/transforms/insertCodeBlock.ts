import {
  InsertNodesOptions,
  isExpanded,
  isSelectionAtBlockStart,
  setDefaults,
  wrapNodes,
} from '@udecode/slate-plugins-common';
import { Editor, Transforms } from 'slate';
import { DEFAULTS_CODE_BLOCK } from '../defaults';
import { CodeBlockOptions, CodeLineOptions } from '../types';

/**
 * Insert a code block: set the node to code line and wrap it with a code block.
 * If the cursor is not at the block start, insert break before.
 */
export const insertCodeBlock = (
  editor: Editor,
  options: Omit<InsertNodesOptions, 'match'> = {},
  pluginsOptions: CodeBlockOptions & CodeLineOptions = {}
) => {
  if (!editor.selection || isExpanded(editor.selection)) return;

  const { code_line, code_block } = setDefaults(
    pluginsOptions,
    DEFAULTS_CODE_BLOCK
  );

  if (!isSelectionAtBlockStart(editor)) {
    editor.insertBreak();
  }

  Transforms.setNodes(
    editor,
    {
      type: code_line.type,
      children: [{ text: '' }],
    },
    options
  );

  wrapNodes(
    editor,
    {
      type: code_block.type,
      children: [],
    },
    options
  );
};
