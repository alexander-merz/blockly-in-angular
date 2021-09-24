import { CustomBlock } from 'ngx-blockly';

export class ExampleBlock extends CustomBlock {
  constructor() {
    // Add Mutator or further args if needed
    super('ExampleBlock');
    this.class = ExampleBlock;
  }

  defineBlock() {
    this.block.appendDummyInput().appendField(this.type);
    this.block.setOutput(true, 'Input');
    this.block.setColour(30);
    this.block.setTooltip('');
    this.block.setHelpUrl('');
  }
}
