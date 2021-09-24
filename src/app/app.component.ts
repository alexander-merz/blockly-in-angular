import { AfterViewInit, Component } from '@angular/core';
import * as Blockly from 'blockly';
import {
  Category,
  CustomBlock,
  LOGIC_CATEGORY,
  NgxBlocklyToolbox,
} from 'ngx-blockly';
import { ExampleBlock } from './example-block';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit {
  private workspace: Blockly.WorkspaceSvg | undefined;
  private readonly toolbox: NgxBlocklyToolbox;

  public constructor() {
    this.toolbox = new NgxBlocklyToolbox(
      new Blockly.WorkspaceSvg(new Blockly.Options({}))
    );

    this.toolbox.nodes = [LOGIC_CATEGORY];
  }

  public ngAfterViewInit(): void {
    this.workspace = Blockly.inject('blocklyDiv', {
      toolbox: this.toolbox.toXML(),
    });

    const exampleBlock = new ExampleBlock();
    const customBlocks: CustomBlock[] = [exampleBlock];

    for (const customBlock of customBlocks) {
      Blockly.Blocks[customBlock.type] = {
        init: function () {
          const block = new customBlock.class(
            customBlock.type,
            customBlock.blockMutator,
            ...customBlock.args
          );
          block.init(this);
          this.mixin({ blockInstance: block });
        },
      } as Blockly.Block;
    }

    const customCategory = new Category('custom', '#FF2b1a', [exampleBlock]);
    this.toolbox.nodes = [LOGIC_CATEGORY, customCategory];

    this.workspace.updateToolbox(this.toolbox.toXML());
  }
}
