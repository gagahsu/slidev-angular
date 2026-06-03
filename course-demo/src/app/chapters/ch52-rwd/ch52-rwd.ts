import { Component, OnInit, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ch52-rwd',
  templateUrl: './ch52-rwd.html',
  styleUrl: './ch52-rwd.css',
  standalone: true,
  imports: [CommonModule]
})
export class Ch52Rwd implements OnInit {
  private breakpointObserver = inject(BreakpointObserver);

  currentDevice: string = 'Desktop';
  windowWidth: number = window.innerWidth;

  ngOnInit(): void {
    this.breakpointObserver.observe([
      Breakpoints.Handset,
      Breakpoints.Tablet,
      Breakpoints.Web
    ]).subscribe(result => {
      if (result.breakpoints[Breakpoints.Handset]) {
        this.currentDevice = '📱 手機（Mobile）';
      } else if (result.breakpoints[Breakpoints.Tablet]) {
        this.currentDevice = '📟 平板（Tablet）';
      } else {
        this.currentDevice = '🖥️ 桌機（Desktop）';
      }
    });

    window.addEventListener('resize', () => {
      this.windowWidth = window.innerWidth;
    });
  }
}
