import { Directive, HostListener, ElementRef, Renderer2} from '@angular/core';

@Directive({
  selector: '[appRipple]',
})
export class RippleDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) {
    el.nativeElement.style = 'position: relative; overflow: hidden;';
  }

  @HostListener('click', ['$event'])
  onClick($event: MouseEvent): void {
    if (!$event.target)
      return;
    const { renderer, el } = this;
    const target = el.nativeElement;
    const ripple = renderer.createElement('span');

    renderer.addClass(ripple, 'ripple');
    renderer.listen(ripple, 'animationend', ($event: AnimationEvent) => {
      const target = $event.target;
      const parent = renderer.parentNode(target);
      renderer.removeChild(parent, target);
    });

    const size = Math.max(target.offsetWidth, target.offsetHeight);
    const center = size / 2;

    let rippleCenterX = $event.clientX - target.offsetLeft;
    let rippleCenterY = $event.clientY - target.offsetTop;

    // if Enter was pressed or undefined behavior
    if (rippleCenterX < 0 || rippleCenterX > target.clientWidth ||
        rippleCenterY < 0 || rippleCenterY > target.clientHeight) {
      rippleCenterX = target.clientWidth / 2;
      rippleCenterY = target.clientHeight / 2;
    }

    const left = rippleCenterX - center;
    const top = rippleCenterY - center;
    
    ripple.style.height = ripple.style.width = `${size}px`;
    ripple.style.left = `${left}px`;
    ripple.style.top = `${top}px`;

    renderer.appendChild(el.nativeElement, ripple);
    el.nativeElement.appendChild(ripple);
  }

}
