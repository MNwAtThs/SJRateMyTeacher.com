const $ = (s, o = document) => o.querySelector(s);
const $$ = (s, o = document) => o.querySelectorAll(s);

let emoji = $('.rating-slider'),
    button = $('button', emoji),
    slider = $('.slide', emoji),
    drag = $('div', slider),
    smiley = $('.smiley', emoji),
    points = {
        0: {
            name: 'awful',
            mouth: 'M32,2 C41.5729357,2 58,10.8218206 58,21 C50.2396023,18.9643641 41.5729357,17.9465462 32,17.9465462 C22.4270643,17.9465462 13.7603977,18.9643641 6,21 C6,10.8218206 22.4270643,2 32,2 Z',
            eye: 'M12.6744144,18.0128897 C17.3794842,15.6567898 19.3333811,9.83072065 17.0385652,5 C15.7595661,7.57089081 13.5517099,9.64170285 10.4149967,11.2124361 C7.27828344,12.7831694 3.80661788,13.5564215 0,13.5321925 C2.2948159,18.3629131 7.9693445,20.3689896 12.6744144,18.0128897 Z'
        },
        61: {
            name: 'bad',
            mouth: 'M32,6 C41.5729357,6 62,10.80044 62,23 C52.2396023,17.5602347 42.2396023,14.840352 32,14.840352 C21.7603977,14.840352 11.7603977,17.5602347 2,23 C2,10.80044 22.4270643,6 32,6 Z',
            eye: 'M9,19 C14.418278,19 17,15.418278 17,11 C17,6.581722 14.418278,3 9,3 C3.581722,3 1,6.581722 1,11 C1,15.418278 3.581722,19 9,19 Z'
        },
        134: {
            name: 'okay',
            mouth: 'M32,11.3326144 C41.5729357,11.3326144 51.5729357,9.55507624 62,4 C62,12.8056732 46.3594035,23 32,23 C17.6405965,23 2,12.8056732 2,4 C12.4270643,9.55507624 22.4270643,11.3326144 32,11.3326144 Z',
            eye: 'M9,19 C14.418278,19 17,15.418278 17,11 C17,6.581722 14.418278,3 9,3 C3.581722,3 1,6.581722 1,11 C1,15.418278 3.581722,19 9,19 Z'
        },
        207: {
            name: 'good',
            mouth: 'M32,6.33261436 C41.5729357,6.33261436 51.5729357,5.55507624 62,0 C62,8.80567319 46.3594035,25 32,25 C17.6405965,25 2,8.80567319 2,0 C12.4270643,5.55507624 22.4270643,6.33261436 32,6.33261436 Z',
            eye: 'M9,21 C13.418278,21 17,16.418278 17,11 C17,5.581722 13.418278,1 9,1 C4.581722,1 1,5.581722 1,11 C1,16.418278 4.581722,21 9,21 Z'
        },
        264: {
            name: 'great',
            mouth: 'M32,6.33261436 C41.5729357,6.33261436 53.5729357,5.55507624 64,0 C64,8.80567319 51.3594035,27 32,27 C12.6405965,27 0,8.80567319 0,0 C10.4270643,5.55507624 22.4270643,6.33261436 32,6.33261436 Z',
            eye: 'M9,22 C13.418278,22 17,16.418278 17,11 C17,5.581722 13.418278,0 9,0 C4.581722,0 1,5.581722 1,11 C1,16.418278 4.581722,22 9,22 Z'
        }
    };

gsap.registerPlugin(MorphSVGPlugin);
gsap.registerPlugin(InertiaPlugin);

function setEmoji(value, duration = .4) {
    let index = value == 0 ? value : Object.keys(points).indexOf(value),
        name = points[value].name,
        computed = getComputedStyle(emoji);
    emoji.classList.remove('awful', 'bad', 'okay', 'good', 'great');
    emoji.classList.add(name, 'scale');
    gsap.to(emoji, {
        '--y': index * -100 + '%',
        '--fill': computed.getPropertyValue('--' + name + '-fill'),
        '--radial': computed.getPropertyValue('--' + name + '-radial'),
        '--border': computed.getPropertyValue('--' + name + '-border'),
        '--shadow': computed.getPropertyValue('--' + name + '-shadow'),
        '--mouth-fill': computed.getPropertyValue('--' + name + '-mouth-fill'),
        '--mouth-shadow': computed.getPropertyValue('--' + name + '-mouth-shadow'),
        '--mouth-shine': computed.getPropertyValue('--' + name + '-mouth-shine'),
        duration: duration
    });
    gsap.to($$('.eye path', smiley), {
        morphSVG: points[value].eye,
        duration: .4
    });
    gsap.to($('.mouth path', smiley), {
        morphSVG: points[value].mouth,
        duration: .4
    });
    setTimeout(() => emoji.classList.remove('scale'), 600);
    return value;
}

Draggable.create(drag, {
    type: 'x',
    bounds: {
        left: -drag.offsetWidth / 2,
        width: slider.offsetWidth + drag.offsetWidth
    },
    inertia: true,
    snap(value) {
        return setEmoji(Object.keys(points).reduce((p, c) => {
            return (Math.abs(c - value) < Math.abs(p - value) ? c : p);
        }));
    },
    onThrowUpdate() {
        let x = this.x > 0 ? this.x : 0;
        emoji.style.setProperty('--w', x + 'px');
    },
    onMove() {
        let x = this.x > 0 ? this.x : 0;
        emoji.style.setProperty('--w', x + 'px');
    }
});

setEmoji(0, 0);