import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HomeService } from '../home/home.service';
import { TreeNodeService } from './tree-node.service';


export interface TreeNode {
  id: string,
  label: string,
  isOpen?: boolean,
  children?: TreeNode[]
}

@Component({
  selector: 'app-tree-node',
  imports: [FormsModule, CommonModule],
  template: `


      
   

  `,
  styleUrl: './tree-node.scss',
})
export class TreeNodeComponent {

  //  this.treeData = [
  //   {
  //     id: '1',
  //     label: 'Projects',
  //     isOpen: true,
  //     children: [
  //       {
  //         id: '1.1',
  //         label: 'Frontend',
  //         children: [
  //           { id: '1.1.1', label: 'index.html' },
  //           { id: '1.1.2', label: 'styles.css' }
  //         ]
  //       }, {
  //         id: '1.2',
  //         label: 'Backend',
  //         children: []
  //       }
  //     ]
  //   },
  //   {
  //     id: '2',
  //     label: 'Personal',
  //     children: [{ id: '2.1', label: 'Resume.pdf' }]

  //   }
  // ]



}
