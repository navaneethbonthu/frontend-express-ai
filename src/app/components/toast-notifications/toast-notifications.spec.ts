import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { ToastNotifications } from './toast-notifications';



describe('ToastNotifications', () => {
  let component: ToastNotifications;
  let fixture: ComponentFixture<ToastNotifications>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToastNotifications]
    }).compileComponents();

    fixture = TestBed.createComponent(ToastNotifications);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Test 1: Initial State
  it('should start with an empty notification list', () => {
    expect(component.notifications().length).toBe(0);
  });

  // Test 2: Adding a Toast
  it('should add a notification when showToast is called', () => {
    component.showToast('Success Message', 'success');

    const notifications = component.notifications();
    expect(notifications.length).toBe(1);
    expect(notifications[0].message).toBe('Success Message');
    expect(notifications[0].type).toBe('success');
  });

  // Test 3: Manual Dismissal
  it('should remove a notification when dismiss is called', () => {
    component.showToast('To be removed', 'warning');
    const id = component.notifications()[0].id;

    component.dismiss(id);

    expect(component.notifications().length).toBe(0);
  });

  // Test 4: Auto-Dismissal (The Critical Test)
  // fakeAsync allows us to use tick() to simulate time
  it('should automatically remove a notification after 5 seconds', fakeAsync(() => {
    component.showToast('Auto-expire message', 'error');
    expect(component.notifications().length).toBe(1);

    // Simulate 4.9 seconds passing
    tick(4900);
    expect(component.notifications().length).toBe(1); // Still there

    // Simulate passing the 5-second mark
    tick(101);
    expect(component.notifications().length).toBe(0); // Gone!
  }));

  // Test 5: Multiple Independent Timers
  it('should handle multiple notifications with different timers', fakeAsync(() => {
    component.showToast('First', 'success'); // Time 0
    tick(2000); // Wait 2 seconds

    component.showToast('Second', 'error'); // Time 2
    expect(component.notifications().length).toBe(2);

    tick(3100); // Total 5.1 seconds since First, 3.1 since Second
    expect(component.notifications().length).toBe(1); // First is gone
    expect(component.notifications()[0].message).toBe('Second'); // Second remains

    tick(2000); // Total 5.1 seconds since Second
    expect(component.notifications().length).toBe(0); // Both gone
  }));

  // Test 6: DOM Rendering
  it('should render the notification in the HTML', () => {
    component.showToast('Render Test', 'success');
    fixture.detectChanges(); // Update the HTML

    const toastElement = fixture.nativeElement.querySelector('.toast');
    expect(toastElement).toBeTruthy();
    expect(toastElement.textContent).toContain('Render Test');
    expect(toastElement.classList).toContain('success');
  });
});
