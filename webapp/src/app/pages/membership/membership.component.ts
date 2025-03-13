import { Component } from '@angular/core';

@Component({
  selector: 'app-membership',
  standalone: true,
  imports: [],
  templateUrl: './membership.component.html',
  styleUrl: './membership.component.css',
})
export class MembershipComponent {
  handleButtonClick(plan: string) {
    alert(`Congratulations you have subscribed to ${plan} package`);
  }
}
