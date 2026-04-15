import { Component, OnInit } from "@angular/core";
import { HomeService } from "./home.service";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { TreeNode, TreeNodeComponent } from "../tree-node/tree-node";
import { TreeNodeService } from "../tree-node/tree-node.service";



@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  template: `


    
   `,

  styleUrl: './home.scss',
})
export class Home implements OnInit {

  ngOnInit(): void {

  }

}





