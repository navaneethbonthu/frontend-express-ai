import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HomeService } from '../home/home.service';
import { TreeNodeService } from './tree-node.service';
import { Observable, Subject } from 'rxjs';


export interface TreeNode {
  id: string,
  label: string,
  children?: TreeNode[],
  isOpen?: boolean
}


@Component({
  selector: 'app-tree-node',
  imports: [FormsModule, CommonModule],
  template: `

  
   

  `,
  styleUrl: './tree-node.scss',
})
export class TreeNodeComponent {



}
