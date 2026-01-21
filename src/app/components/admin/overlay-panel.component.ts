import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-overlay-panel',
  template: `
    @if (isVisible()) {
      <div class="overlay" (click)="closePanel()"></div>
      <div class="overlay-panel-content">
        <div class="header">
          <h3>{{ title() }}</h3>
          <button class="close-button" (click)="closePanel()">X</button>
        </div>
        <div class="body">
          <ng-content></ng-content>
        </div>
      </div>
    }
  `,
  styles: [
    `
      .overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.6);
        z-index: 999;
      }

      .overlay-panel-content {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        padding: 25px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        z-index: 1000;
        width: 90%;
        max-width: 500px;
        display: flex;
        flex-direction: column;
        max-height: 90vh;
      }

      .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
        padding-bottom: 10px;
        border-bottom: 1px solid #eee;
      }

      .header h3 {
        margin: 0;
        color: #333;
        font-size: 1.5em;
      }

      .close-button {
        background: none;
        border: none;
        font-size: 1.5em;
        cursor: pointer;
        color: #777;
        transition: color 0.2s ease;
      }

      .close-button:hover {
        color: #333;
      }

      .body {
        flex-grow: 1;
        overflow-y: auto;
      }
    `,
  ],
  standalone: true,
  imports: [CommonModule],
})
export class OverlayPanelComponent {
  isVisible = input<boolean>(false);
  title = input<string>('Panel Title');
  close = output<void>();

  closePanel() {
    this.close.emit();
  }
}
