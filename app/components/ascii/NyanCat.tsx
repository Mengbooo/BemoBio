'use client';

import React from 'react';

const NyanCat = () => {
  return (
    <div className="nyan-cat-wrapper">
      <div className="rainbow">
        <div className="sprite"></div>
      </div>
      
      <ul className="stars">
        <li><i></i></li><li><i></i></li><li><i></i></li><li><i></i></li>
        <li><i></i></li><li><i></i></li><li><i></i></li><li><i></i></li>
        <li><i></i></li><li><i></i></li><li><i></i></li><li><i></i></li>
      </ul>
      
      <div className="cat">
        <div className="tail">
          <div className="sprite"></div>
        </div>
        <div className="feet">
          <div className="sprite"></div>
        </div>
        <div className="poptart"></div>
        <div className="head"></div>
      </div>

      <style jsx>{`
        /* ==================================
           Variables & Settings
           ================================== */
        .nyan-cat-wrapper {
          --scale: 10px;
          --speed: 1s;

          /* Colors */
          --pink: #f9f;
          --tan: #fc9;
          --magenta: #f39;
          --gray: #999;
          --peach: #f99;
          --sky:rgb(0, 0, 0); 
          --sky-bg:rgb(0, 0, 0); 
          --red: #f00;
          --orange: #f90;
          --yellow: #ff0;
          --green: #3f0;
          --light-blue: #09f;
          --blue: #63f;
          --white: #fff;
          --black: #000;

          position: relative;
          background: var(--sky-bg);
          overflow: hidden;
          width: 100%;
          min-height: 30vh;
          margin: 0;
          filter: blur(5px);
        }

        /* List Reset */
        .nyan-cat-wrapper ul, .nyan-cat-wrapper li {
          margin: 0;
          padding: 0;
          list-style: none;
        }

        /* Shared Animations */
        .cat, .poptart, .head, .feet, .tail, .rainbow, .sprite, .stars li, .stars li i {
          position: absolute;
          background-repeat: no-repeat;
          animation-iteration-count: infinite;
          animation-timing-function: step-end;
        }

        /* ==================================
           Cat Container
           ================================== */
        .cat {
          top: 50%;
          left: 77%;
          margin-left: calc(var(--scale) * -10);
          margin-top: calc(var(--scale) * -10);
          animation-name: catCycle;
          animation-duration: calc(var(--speed) / 2);
        }

        @keyframes catCycle {
          0%, 100% { margin-top: calc(var(--scale) * -10); } 
          33.3%    { margin-top: calc(var(--scale) * -9);  } 
        }

        /* ==================================
           Poptart
           ================================== */
        .poptart {
          --u: calc(100% / 21); /* unit for gradients */
          left: 0;
          top: 0;
          width: calc(var(--scale) * 21);
          height: calc(var(--scale) * 18);
          background-image:
            /* sprinkles */
            linear-gradient(to right, var(--magenta) 0%, var(--magenta) 100%),
            linear-gradient(to right, var(--magenta) 0%, var(--magenta) 100%),
            linear-gradient(to right, var(--magenta) 0%, var(--magenta) 100%),
            linear-gradient(to right, var(--magenta) 0%, var(--magenta) 100%),
            linear-gradient(to right, var(--magenta) 0%, var(--magenta) 100%),
            linear-gradient(to right, var(--magenta) 0%, var(--magenta) 100%),
            linear-gradient(to right, var(--magenta) 0%, var(--magenta) 100%),
            linear-gradient(to right, var(--magenta) 0%, var(--magenta) 100%),
            linear-gradient(to right, var(--magenta) 0%, var(--magenta) 100%),
            linear-gradient(to right, var(--magenta) 0%, var(--magenta) 100%),
            linear-gradient(to right, var(--magenta) 0%, var(--magenta) 100%),
            /* frosting */
            linear-gradient(to right, 
              transparent 0%, transparent calc(var(--u) * 2), 
              var(--pink) calc(var(--u) * 2), var(--pink) calc(var(--u) * 19),
              transparent calc(var(--u) * 19), transparent 100%
            ), 
            linear-gradient(to right, 
              transparent 0%, transparent calc(var(--u) * 3), 
              var(--pink) calc(var(--u) * 3), var(--pink) calc(var(--u) * 18),
              transparent calc(var(--u) * 18), transparent 100%
            ), 
            linear-gradient(to right, 
              transparent 0%, transparent calc(var(--u) * 4), 
              var(--pink) calc(var(--u) * 4), var(--pink) calc(var(--u) * 17),
              transparent calc(var(--u) * 17), transparent 100%
            ),
            /* bread */
            linear-gradient(to right,  
              var(--black) 0%, var(--black) var(--u),
              var(--tan) var(--u), var(--tan) calc(var(--u) * 20),
              var(--black) calc(var(--u) * 20), var(--black) 100%
            ), 
            linear-gradient(to right, 
              transparent 0%, transparent var(--u), 
              var(--black) var(--u), var(--black) calc(var(--u) * 2),
              var(--tan) calc(var(--u) * 2), var(--tan) calc(var(--u) * 19),
              var(--black) calc(var(--u) * 19), var(--black) calc(var(--u) * 20),
              transparent calc(var(--u) * 19), transparent 100%
            ), 
            linear-gradient(to right, 
              transparent 0%, transparent calc(var(--u) * 2), 
              var(--black) calc(var(--u) * 2), var(--black) calc(var(--u) * 19),
              transparent calc(var(--u) * 19), transparent 100%
            );
          background-position:
            /* sprinkles */
            calc(var(--scale)*9) calc(var(--scale)*3), calc(var(--scale)*12) calc(var(--scale)*3), calc(var(--scale)*4) calc(var(--scale)*4), calc(var(--scale)*16) calc(var(--scale)*5), calc(var(--scale)*8) calc(var(--scale)*7), calc(var(--scale)*5) calc(var(--scale)*9), calc(var(--scale)*9) calc(var(--scale)*10), calc(var(--scale)*3) calc(var(--scale)*11), calc(var(--scale)*7) calc(var(--scale)*13), calc(var(--scale)*4) calc(var(--scale)*14), calc(var(--scale)*11) calc(var(--scale)*14),
            /* frosting */
            0 calc(var(--scale)*4), 0 calc(var(--scale)*3), 0 calc(var(--scale)*2),
            /* bread */
            0 calc(var(--scale)*2), 0 var(--scale), 0 0;
          background-size:
            /* sprinkles */
            var(--scale) var(--scale), var(--scale) var(--scale), var(--scale) var(--scale), var(--scale) var(--scale), var(--scale) var(--scale), var(--scale) var(--scale), var(--scale) var(--scale), var(--scale) var(--scale), var(--scale) var(--scale), var(--scale) var(--scale), var(--scale) var(--scale),
            /* frosting */
            100% calc(var(--scale)*10), 100% calc(var(--scale)*12), 100% calc(var(--scale)*14),
            /* bread */
            100% calc(var(--scale)*14), 100% calc(var(--scale)*16), 100% 100%;
        }

        /* ==================================
           Head
           ================================== */
        .head {
          --u: calc(100% / 16);
          left: calc(var(--scale)*10);
          top: calc(var(--scale)*5);
          width: calc(var(--scale)*16);
          height: calc(var(--scale)*13);
          background-image:
            linear-gradient(to right, 
              transparent 0%, transparent calc(var(--u)*2), 
              var(--black) calc(var(--u)*2), var(--black) calc(var(--u)*4),
              transparent calc(var(--u)*4), transparent calc(var(--u)*12),
              var(--black) calc(var(--u)*12), var(--black) calc(var(--u)*14),
              transparent calc(var(--u)*14), transparent 100%
            ), 
            linear-gradient(to right, 
              transparent 0%, transparent var(--u), 
              var(--black) var(--u), var(--black) calc(var(--u)*2),
              var(--gray) calc(var(--u)*2), var(--gray) calc(var(--u)*4),
              var(--black) calc(var(--u)*4), var(--black) calc(var(--u)*5),
              transparent calc(var(--u)*5), transparent calc(var(--u)*11),
              var(--black) calc(var(--u)*11), var(--black) calc(var(--u)*12),
              var(--gray) calc(var(--u)*12), var(--gray) calc(var(--u)*14),
              var(--black) calc(var(--u)*14), var(--black) calc(var(--u)*15),
              transparent calc(var(--u)*15), transparent 100%
            ), 
            linear-gradient(to right, 
              transparent 0%, transparent var(--u), 
              var(--black) var(--u), var(--black) calc(var(--u)*2),
              var(--gray) calc(var(--u)*2), var(--gray) calc(var(--u)*5),
              var(--black) calc(var(--u)*5), var(--black) calc(var(--u)*6),
              transparent calc(var(--u)*6), transparent calc(var(--u)*10),
              var(--black) calc(var(--u)*10), var(--black) calc(var(--u)*11),
              var(--gray) calc(var(--u)*11), var(--gray) calc(var(--u)*14),
              var(--black) calc(var(--u)*14), var(--black) calc(var(--u)*15),
              transparent calc(var(--u)*15), transparent 100%
            ), 
            linear-gradient(to right, 
              transparent 0%, transparent var(--u), 
              var(--black) var(--u), var(--black) calc(var(--u)*2),
              var(--gray) calc(var(--u)*2), var(--gray) calc(var(--u)*6),
              var(--black) calc(var(--u)*6), var(--black) calc(var(--u)*10),
              var(--gray) calc(var(--u)*10), var(--gray) calc(var(--u)*14),
              var(--black) calc(var(--u)*14), var(--black) calc(var(--u)*15),
              transparent calc(var(--u)*15), transparent 100%
            ), 
            linear-gradient(to right, 
              transparent 0%, transparent var(--u), 
              var(--black) var(--u), var(--black) calc(var(--u)*2),
              var(--gray) calc(var(--u)*2), var(--gray) calc(var(--u)*14),
              var(--black) calc(var(--u)*14), var(--black) calc(var(--u)*15),
              transparent calc(var(--u)*15), transparent 100%
            ), 
            linear-gradient(to right, 
              var(--black) 0%, var(--black) var(--u),
              var(--gray) var(--u), var(--gray) calc(var(--u)*15),
              var(--black) calc(var(--u)*15), var(--black) 100%
            ), 
            linear-gradient(to right, 
              var(--black) 0%, var(--black) var(--u),
              var(--gray) var(--u), var(--gray) calc(var(--u)*4),
              var(--white) calc(var(--u)*4), var(--white) calc(var(--u)*5),
              var(--black) calc(var(--u)*5), var(--black) calc(var(--u)*6),
              var(--gray) calc(var(--u)*6), var(--gray) calc(var(--u)*11),
              var(--white) calc(var(--u)*11), var(--white) calc(var(--u)*12),
              var(--black) calc(var(--u)*12), var(--black) calc(var(--u)*13),
              var(--gray) calc(var(--u)*13), var(--gray) calc(var(--u)*15),
              var(--black) calc(var(--u)*15), var(--black) 100%
            ), 
            linear-gradient(to right, 
              var(--black) 0%, var(--black) var(--u),
              var(--gray) var(--u), var(--gray) calc(var(--u)*4),
              var(--black) calc(var(--u)*4), var(--black) calc(var(--u)*6),
              var(--gray) calc(var(--u)*6), var(--gray) calc(var(--u)*9),
              var(--black) calc(var(--u)*9), var(--black) calc(var(--u)*10),
              var(--gray) calc(var(--u)*10), var(--gray) calc(var(--u)*11),
              var(--black) calc(var(--u)*11), var(--black) calc(var(--u)*13),
              var(--gray) calc(var(--u)*13), var(--gray) calc(var(--u)*15),
              var(--black) calc(var(--u)*15), var(--black) 100%
            ), 
            linear-gradient(to right, 
              var(--black) 0%, var(--black) var(--u),
              var(--gray) var(--u), var(--gray) calc(var(--u)*2),
              var(--peach) calc(var(--u)*2), var(--peach) calc(var(--u)*4),
              var(--gray) calc(var(--u)*4), var(--gray) calc(var(--u)*13),
              var(--peach) calc(var(--u)*13), var(--peach) calc(var(--u)*15),
              var(--black) calc(var(--u)*15), var(--black) 100%
            ), 
            linear-gradient(to right, 
              var(--black) 0%, var(--black) var(--u),
              var(--gray) var(--u), var(--gray) calc(var(--u)*2),
              var(--peach) calc(var(--u)*2), var(--peach) calc(var(--u)*4),
              var(--gray) calc(var(--u)*4), var(--gray) calc(var(--u)*5),
              var(--black) calc(var(--u)*5), var(--black) calc(var(--u)*6),
              var(--gray) calc(var(--u)*6), var(--gray) calc(var(--u)*8),
              var(--black) calc(var(--u)*8), var(--black) calc(var(--u)*9),
              var(--gray) calc(var(--u)*9), var(--gray) calc(var(--u)*11),
              var(--black) calc(var(--u)*11), var(--black) calc(var(--u)*12),
              var(--gray) calc(var(--u)*12), var(--gray) calc(var(--u)*13),
              var(--peach) calc(var(--u)*13), var(--peach) calc(var(--u)*15),
              var(--black) calc(var(--u)*15), var(--black) 100%
            ), 
            linear-gradient(to right, 
              transparent 0%, transparent var(--u), 
              var(--black) var(--u), var(--black) calc(var(--u)*2),
              var(--gray) calc(var(--u)*2), var(--gray) calc(var(--u)*5),
              var(--black) calc(var(--u)*5), var(--black) calc(var(--u)*12),
              var(--gray) calc(var(--u)*12), var(--gray) calc(var(--u)*14),
              var(--black) calc(var(--u)*14), var(--black) calc(var(--u)*15),
              transparent calc(var(--u)*15), transparent 100%
            ), 
            linear-gradient(to right, 
              transparent 0%, transparent calc(var(--u)*2), 
              var(--black) calc(var(--u)*2), var(--black) calc(var(--u)*3),
              var(--gray) calc(var(--u)*3), var(--gray) calc(var(--u)*13),
              var(--black) calc(var(--u)*13), var(--black) calc(var(--u)*14),
              transparent calc(var(--u)*14), transparent 100%
            ), 
            linear-gradient(to right, 
              transparent 0%, transparent calc(var(--u)*3), 
              var(--black) calc(var(--u)*3), var(--black) calc(var(--u)*13),
              transparent calc(var(--u)*13), transparent 100%
            );
          background-position:
            0 0, 0 var(--scale), 0 calc(var(--scale)*2), 0 calc(var(--scale)*3), 0 calc(var(--scale)*4), 0 calc(var(--scale)*5), 0 calc(var(--scale)*6), 0 calc(var(--scale)*7), 0 calc(var(--scale)*8), 0 calc(var(--scale)*9), 0 calc(var(--scale)*10), 0 calc(var(--scale)*11), 0 calc(var(--scale)*12);
          background-size: 100% var(--scale);
          animation-name: headCycle;
          animation-duration: calc(var(--speed)/2);
        }

        @keyframes headCycle {
          0%, 100% { margin-left: 0; margin-top: 0; }
          16.7%    { margin-left: var(--scale); margin-top: 0; }
          66.7%    { margin-left: 0; margin-top: 0; }
          83.3%    { margin-left: 0; margin-top: calc(var(--scale)*-1); }
        }

        /* ==================================
           Feet
           ================================== */
        .feet {
          width: calc(var(--scale)*24);
          height: calc(var(--scale)*5);
          overflow: hidden;
          left: calc(var(--scale)*-2);
          top: calc(var(--scale)*15);
          animation-name: feetCycle;
          animation-duration: calc(var(--speed)/2);
        }

        .feet .sprite {
          --u: calc(100% / 24);
          top: 0;
          width: calc(var(--scale)*24);
          height: calc(var(--scale)*15);
          background-image:
            /* frame 1 */
            linear-gradient(to right, 
              transparent 0%, transparent calc(var(--u)*2), 
              var(--black) calc(var(--u)*2), var(--black) calc(var(--u)*4),
              var(--gray) calc(var(--u)*4), var(--gray) calc(var(--u)*5),
              transparent calc(var(--u)*5), transparent 100%
            ), 
            linear-gradient(to right, 
              transparent 0%, transparent var(--u), 
              var(--black) var(--u), var(--black) calc(var(--u)*3),
              var(--gray) calc(var(--u)*3), var(--gray) calc(var(--u)*6),
              transparent calc(var(--u)*6), transparent calc(var(--u)*19),
              var(--gray) calc(var(--u)*19), var(--gray) calc(var(--u)*22),
              var(--black) calc(var(--u)*22), var(--black) calc(var(--u)*23),
              transparent calc(var(--u)*23), transparent 100%
            ), 
            linear-gradient(to right, 
              var(--black) 0%, var(--black) var(--u), 
              var(--gray) var(--u), var(--gray) calc(var(--u)*4),
              var(--black) calc(var(--u)*4), var(--black) calc(var(--u)*6),
              var(--gray) calc(var(--u)*6), var(--gray) calc(var(--u)*10),
              var(--black) calc(var(--u)*10), var(--black) calc(var(--u)*11),
              transparent calc(var(--u)*11), transparent calc(var(--u)*14),
              var(--black) calc(var(--u)*14), var(--black) calc(var(--u)*15),
              var(--gray) calc(var(--u)*15), var(--gray) calc(var(--u)*18),
              var(--black) calc(var(--u)*18), var(--black) calc(var(--u)*20),
              var(--gray) calc(var(--u)*20), var(--gray) calc(var(--u)*23),
              var(--black) calc(var(--u)*23), var(--black) 100%
            ), 
            linear-gradient(to right, 
              var(--black) 0%, var(--black) var(--u), 
              var(--gray) var(--u), var(--gray) calc(var(--u)*3),
              var(--black) calc(var(--u)*3), var(--black) calc(var(--u)*5),
              transparent calc(var(--u)*5), transparent calc(var(--u)*6),
              var(--black) calc(var(--u)*6), var(--black) calc(var(--u)*7),
              var(--gray) calc(var(--u)*7), var(--gray) calc(var(--u)*9),
              var(--black) calc(var(--u)*9), var(--black) calc(var(--u)*10),
              transparent calc(var(--u)*10), transparent calc(var(--u)*15),
              var(--black) calc(var(--u)*15), var(--black) calc(var(--u)*16),
              var(--gray) calc(var(--u)*16), var(--gray) calc(var(--u)*18),
              var(--black) calc(var(--u)*18), var(--black) calc(var(--u)*19),
              transparent calc(var(--u)*19), transparent calc(var(--u)*20),
              var(--black) calc(var(--u)*20), var(--black) calc(var(--u)*21),
              var(--gray) calc(var(--u)*21), var(--gray) calc(var(--u)*23),
              var(--black) calc(var(--u)*23), var(--black) 100%
            ), 
            linear-gradient(to right, 
              var(--black) 0%, var(--black) calc(var(--u)*4), 
              transparent calc(var(--u)*4), transparent calc(var(--u)*6),
              var(--black) calc(var(--u)*6), var(--black) calc(var(--u)*9),
              transparent calc(var(--u)*8), transparent calc(var(--u)*16),
              var(--black) calc(var(--u)*16), var(--black) calc(var(--u)*19),
              transparent calc(var(--u)*19), transparent calc(var(--u)*21),
              var(--black) calc(var(--u)*21), var(--black) calc(var(--u)*23),
              transparent calc(var(--u)*23), transparent 100%
            ),
            /* frames 2-5 */
            linear-gradient(to right, 
              transparent 0%, transparent calc(var(--u)*2), 
              var(--black) calc(var(--u)*2), var(--black) calc(var(--u)*4),
              var(--gray) calc(var(--u)*4), var(--gray) calc(var(--u)*5),
              transparent calc(var(--u)*5), transparent 100%
            ), 
            linear-gradient(to right, 
              transparent 0%, transparent var(--u), 
              var(--black) var(--u), var(--black) calc(var(--u)*2),
              var(--gray) calc(var(--u)*2), var(--gray) calc(var(--u)*6),
              transparent calc(var(--u)*6), transparent calc(var(--u)*19),
              var(--gray) calc(var(--u)*19), var(--gray) calc(var(--u)*22),
              var(--black) calc(var(--u)*22), var(--black) calc(var(--u)*23),
              transparent calc(var(--u)*23), transparent 100%
            ), 
            linear-gradient(to right, 
              var(--black) 0%, var(--black) var(--u), 
              var(--gray) var(--u), var(--gray) calc(var(--u)*4),
              var(--black) calc(var(--u)*4), var(--black) calc(var(--u)*6),
              var(--gray) calc(var(--u)*6), var(--gray) calc(var(--u)*9),
              var(--black) calc(var(--u)*9), var(--black) calc(var(--u)*10),
              transparent calc(var(--u)*10), transparent calc(var(--u)*14),
              var(--black) calc(var(--u)*14), var(--black) calc(var(--u)*15),
              var(--gray) calc(var(--u)*15), var(--gray) calc(var(--u)*18),
              var(--black) calc(var(--u)*18), var(--black) calc(var(--u)*20),
              var(--gray) calc(var(--u)*20), var(--gray) calc(var(--u)*23),
              var(--black) calc(var(--u)*23), var(--black) 100%
            ), 
            linear-gradient(to right, 
              var(--black) 0%, var(--black) var(--u), 
              var(--gray) var(--u), var(--gray) calc(var(--u)*3),
              var(--black) calc(var(--u)*3), var(--black) calc(var(--u)*4),
              transparent calc(var(--u)*4), transparent calc(var(--u)*5),
              var(--black) calc(var(--u)*5), var(--black) calc(var(--u)*6),
              var(--gray) calc(var(--u)*6), var(--gray) calc(var(--u)*8),
              var(--black) calc(var(--u)*8), var(--black) calc(var(--u)*9),
              transparent calc(var(--u)*9), transparent calc(var(--u)*15),
              var(--black) calc(var(--u)*15), var(--black) calc(var(--u)*16),
              var(--gray) calc(var(--u)*16), var(--gray) calc(var(--u)*18),
              var(--black) calc(var(--u)*18), var(--black) calc(var(--u)*19),
              transparent calc(var(--u)*19), transparent calc(var(--u)*20),
              var(--black) calc(var(--u)*20), var(--black) calc(var(--u)*21),
              var(--gray) calc(var(--u)*21), var(--gray) calc(var(--u)*23),
              var(--black) calc(var(--u)*23), var(--black) 100%
            ), 
            linear-gradient(to right, 
              var(--black) 0%, var(--black) calc(var(--u)*3), 
              transparent calc(var(--u)*3), transparent calc(var(--u)*6),
              var(--black) calc(var(--u)*6), var(--black) calc(var(--u)*9),
              transparent calc(var(--u)*9), transparent calc(var(--u)*16),
              var(--black) calc(var(--u)*16), var(--black) calc(var(--u)*19),
              transparent calc(var(--u)*19), transparent calc(var(--u)*21),
              var(--black) calc(var(--u)*21), var(--black) 100%
            ),
            /* frame 6 */
            linear-gradient(to right, 
              transparent 0%, transparent calc(var(--u)*2), 
              var(--black) calc(var(--u)*2), var(--black) calc(var(--u)*4),
              var(--gray) calc(var(--u)*4), var(--gray) calc(var(--u)*5),
              transparent calc(var(--u)*5), transparent 100%
            ), 
            linear-gradient(to right, 
              transparent 0%, transparent var(--u), 
              var(--black) var(--u), var(--black) calc(var(--u)*2),
              var(--gray) calc(var(--u)*2), var(--gray) calc(var(--u)*6),
              transparent calc(var(--u)*6), transparent calc(var(--u)*19),
              var(--gray) calc(var(--u)*19), var(--gray) calc(var(--u)*22),
              var(--black) calc(var(--u)*22), var(--black) calc(var(--u)*23),
              transparent calc(var(--u)*23), transparent 100%
            ), 
            linear-gradient(to right, 
              var(--black) 0%, var(--black) var(--u), 
              var(--gray) var(--u), var(--gray) calc(var(--u)*4),
              var(--black) calc(var(--u)*4), var(--black) calc(var(--u)*6),
              var(--gray) calc(var(--u)*6), var(--gray) calc(var(--u)*9),
              var(--black) calc(var(--u)*9), var(--black) calc(var(--u)*10),
              transparent calc(var(--u)*10), transparent calc(var(--u)*14),
              var(--black) calc(var(--u)*14), var(--black) calc(var(--u)*15),
              var(--gray) calc(var(--u)*15), var(--gray) calc(var(--u)*18),
              var(--black) calc(var(--u)*18), var(--black) calc(var(--u)*20),
              var(--gray) calc(var(--u)*20), var(--gray) calc(var(--u)*23),
              var(--black) calc(var(--u)*23), var(--black) 100%
            ), 
            linear-gradient(to right, 
              var(--black) 0%, var(--black) var(--u), 
              var(--gray) var(--u), var(--gray) calc(var(--u)*3),
              var(--black) calc(var(--u)*3), var(--black) calc(var(--u)*4),
              transparent calc(var(--u)*4), transparent calc(var(--u)*5),
              var(--black) calc(var(--u)*5), var(--black) calc(var(--u)*6),
              var(--gray) calc(var(--u)*6), var(--gray) calc(var(--u)*8),
              var(--black) calc(var(--u)*8), var(--black) calc(var(--u)*9),
              transparent calc(var(--u)*9), transparent calc(var(--u)*15),
              var(--black) calc(var(--u)*15), var(--black) calc(var(--u)*16),
              var(--gray) calc(var(--u)*16), var(--gray) calc(var(--u)*18),
              var(--black) calc(var(--u)*18), var(--black) calc(var(--u)*19),
              transparent calc(var(--u)*19), transparent calc(var(--u)*20),
              var(--black) calc(var(--u)*20), var(--black) calc(var(--u)*21),
              var(--gray) calc(var(--u)*21), var(--gray) calc(var(--u)*23),
              var(--black) calc(var(--u)*23), var(--black) 100%
            ), 
            linear-gradient(to right, 
              var(--black) 0%, var(--black) calc(var(--u)*3), 
              transparent calc(var(--u)*3), transparent calc(var(--u)*5),
              var(--black) calc(var(--u)*5), var(--black) calc(var(--u)*8),
              transparent calc(var(--u)*8), transparent calc(var(--u)*15),
              var(--black) calc(var(--u)*15), var(--black) calc(var(--u)*18),
              transparent calc(var(--u)*18), transparent calc(var(--u)*21),
              var(--black) calc(var(--u)*21), var(--black) 100%
            );
          background-position:
            0 0, 0 var(--scale), 0 calc(var(--scale)*2), 0 calc(var(--scale)*3), 0 calc(var(--scale)*4), 0 calc(var(--scale)*5), 0 calc(var(--scale)*6), 0 calc(var(--scale)*7), 0 calc(var(--scale)*8), 0 calc(var(--scale)*9), 0 calc(var(--scale)*10), 0 calc(var(--scale)*11), 0 calc(var(--scale)*12), 0 calc(var(--scale)*13), 0 calc(var(--scale)*14);
          background-size: 100% var(--scale);
          background-repeat: no-repeat;
          animation-name: feetSpriteCycle;
          animation-duration: calc(var(--speed)/2);
        }

        @keyframes feetCycle {
          0%, 100% { margin-left: 0; }
          16.7%    { margin-left: var(--scale); }
          33.3%    { margin-left: calc(var(--scale)*2); }
          50%      { margin-left: var(--scale); }
          66.7%    { margin-left: calc(var(--scale)*-1); }
        }

        @keyframes feetSpriteCycle {
          0%, 100% { top: 0; }
          16.7%    { top: calc(var(--scale)*-5); }
          83.3%    { top: calc(var(--scale)*-10); }
        }

        /* ==================================
           Tail
           ================================== */
        .tail {
          width: calc(var(--scale)*7);
          height: calc(var(--scale)*7);
          overflow: hidden;
          left: calc(var(--scale)*-7);
          top: calc(var(--scale)*7);
          animation-name: tailCycle;
          animation-duration: calc(var(--speed)/2);
        }

        .tail .sprite {
          --u: calc(100% / 7);
          width: calc(var(--scale)*7);
          height: calc(var(--scale)*35);
          background-image:
            /* frames 1 & 6 */
            linear-gradient(to right, 
              transparent 0%, transparent var(--u),
              var(--black) var(--u), var(--black) calc(var(--u)*5), 
              transparent calc(var(--u)*5), transparent 100%
            ), 
            linear-gradient(to right,
              transparent 0%, transparent var(--u), 
              var(--black) var(--u), var(--black) calc(var(--u)*2),
              var(--gray) calc(var(--u)*2), var(--gray) calc(var(--u)*4),
              var(--black) calc(var(--u)*4), var(--black) calc(var(--u)*6), 
              transparent calc(var(--u)*6), transparent 100%
            ), 
            linear-gradient(to right,
              transparent 0%, transparent var(--u), 
              var(--black) var(--u), var(--black) calc(var(--u)*3),
              var(--gray) calc(var(--u)*3), var(--gray) calc(var(--u)*5),
              var(--black) calc(var(--u)*5), var(--black) 100%
            ), 
            linear-gradient(to right, 
              transparent 0%, transparent calc(var(--u)*2),
              var(--black) calc(var(--u)*2), var(--black) calc(var(--u)*4),
              var(--gray) calc(var(--u)*4), var(--gray) calc(var(--u)*6),
              var(--black) calc(var(--u)*6), var(--black) 100%
            ), 
            linear-gradient(to right, 
              transparent 0%, transparent calc(var(--u)*3),
              var(--black) calc(var(--u)*3), var(--black) calc(var(--u)*5),
              var(--gray) calc(var(--u)*5), var(--gray) 100%
            ), 
            linear-gradient(to right, 
              transparent 0%, transparent calc(var(--u)*4),
              var(--black) calc(var(--u)*4), var(--black) 100%
            ), 
            linear-gradient(to right, 
              transparent 0%, transparent calc(var(--u)*6),
              var(--black) calc(var(--u)*6), var(--black) 100%
            ),
            /* frame 2 */
            linear-gradient(to right, transparent 0%, transparent 100%), 
            linear-gradient(to right, 
              transparent 0%, transparent calc(var(--u)*2),
              var(--black) calc(var(--u)*2), var(--black) calc(var(--u)*4),
              transparent calc(var(--u)*4), transparent 100%
            ), 
            linear-gradient(to right,
              transparent 0%, transparent var(--u), 
              var(--black) var(--u), var(--black) calc(var(--u)*2),
              var(--gray) calc(var(--u)*2), var(--gray) calc(var(--u)*4),
              var(--black) calc(var(--u)*4), var(--black) calc(var(--u)*5),
              transparent calc(var(--u)*5), transparent 100%
            ), 
            linear-gradient(to right,
              transparent 0%, transparent var(--u), 
              var(--black) var(--u), var(--black) calc(var(--u)*2),
              var(--gray) calc(var(--u)*2), var(--gray) calc(var(--u)*4),
              var(--black) calc(var(--u)*4), var(--black) 100%
            ), 
            linear-gradient(to right, 
              transparent 0%, transparent calc(var(--u)*2),
              var(--black) calc(var(--u)*2), var(--black) calc(var(--u)*3),
              var(--gray) calc(var(--u)*3), var(--gray) 100%
            ), 
            linear-gradient(to right, 
              transparent 0%, transparent calc(var(--u)*3),
              var(--black) calc(var(--u)*3), var(--black) calc(var(--u)*5),
              var(--gray) calc(var(--u)*5), var(--gray) 100%
            ), 
            linear-gradient(to right, 
              transparent 0%, transparent calc(var(--u)*5),
              var(--black) calc(var(--u)*5), var(--black) 100%
            ),
            /* frame 3 */
            linear-gradient(to right, transparent 0%, transparent 100%), 
            linear-gradient(to right, transparent 0%, transparent 100%), 
            linear-gradient(to right, 
              transparent 0%, transparent calc(var(--u)*6),
              var(--black) calc(var(--u)*6), var(--black) 100%
            ), 
            linear-gradient(to right, 
              transparent 0%, transparent calc(var(--u)*3),
              var(--black) calc(var(--u)*3), var(--black) 100%
            ), 
            linear-gradient(to right,
              transparent 0%, transparent var(--u), 
              var(--black) var(--u), var(--black) calc(var(--u)*3),
              var(--gray) calc(var(--u)*3), var(--gray) 100%
            ), 
            linear-gradient(to right, 
              transparent 0%, transparent var(--u),
              var(--black) var(--u), var(--black) calc(var(--u)*2),
              var(--gray) calc(var(--u)*2), var(--gray) calc(var(--u)*5),
              var(--black) calc(var(--u)*5), var(--black) 100%
            ), 
            linear-gradient(to right, 
              transparent 0%, transparent calc(var(--u)*2),
              var(--black) calc(var(--u)*2), var(--black) calc(var(--u)*6),
              transparent calc(var(--u)*6), transparent 100%
            ),
            /* frame 4 */
            linear-gradient(to right, transparent 0%, transparent 100%), 
            linear-gradient(to right, 
              transparent 0%, transparent calc(var(--u)*5),
              var(--black) calc(var(--u)*5), var(--black) 100%
            ), 
            linear-gradient(to right, 
              transparent 0%, transparent calc(var(--u)*3),
              var(--black) calc(var(--u)*3), var(--black) calc(var(--u)*5),
              var(--gray) calc(var(--u)*5), var(--gray) 100%
            ), 
            linear-gradient(to right, 
              transparent 0%, transparent calc(var(--u)*2),
              var(--black) calc(var(--u)*2), var(--black) calc(var(--u)*3),
              var(--gray) calc(var(--u)*3), var(--gray) 100%
            ), 
            linear-gradient(to right,
              transparent 0%, transparent var(--u), 
              var(--black) var(--u), var(--black) calc(var(--u)*2),
              var(--gray) calc(var(--u)*2), var(--gray) calc(var(--u)*4),
              var(--black) calc(var(--u)*4), var(--black) 100%
            ), 
            linear-gradient(to right, 
              transparent 0%, transparent var(--u),
              var(--black) var(--u), var(--black) calc(var(--u)*2),
              var(--gray) calc(var(--u)*2), var(--gray) calc(var(--u)*4),
              var(--black) calc(var(--u)*4), var(--black) calc(var(--u)*5),
              transparent calc(var(--u)*5), transparent 100%
            ), 
            linear-gradient(to right, 
              transparent 0%, transparent calc(var(--u)*2),
              var(--black) calc(var(--u)*2), var(--black) calc(var(--u)*4),
              transparent calc(var(--u)*4), transparent 100%
            ),
            /* frame 5 */
            linear-gradient(to right, transparent 0%, transparent 100%), 
            linear-gradient(to right, transparent 0%, transparent 100%), 
            linear-gradient(to right, 
              transparent 0%, transparent var(--u),
              var(--black) var(--u), var(--black) calc(var(--u)*5),
              transparent calc(var(--u)*5), transparent 100%
            ), 
            linear-gradient(to right,
              var(--black) 0%, var(--black) var(--u), 
              var(--gray) var(--u), var(--gray) calc(var(--u)*4),
              var(--black) calc(var(--u)*4), var(--black) 100%
            ), 
            linear-gradient(to right,
              var(--black) 0%, var(--black) calc(var(--u)*2), 
              var(--gray) calc(var(--u)*2), var(--gray) calc(var(--u)*6),
              var(--black) calc(var(--u)*6), var(--black) 100%
            ), 
            linear-gradient(to right, 
              transparent 0%, transparent calc(var(--u)*2),
              var(--black) calc(var(--u)*2), var(--black) calc(var(--u)*6),
              var(--gray) calc(var(--u)*6), var(--gray) 100%
            ), 
            linear-gradient(to right, 
              transparent 0%, transparent calc(var(--u)*5),
              var(--black) calc(var(--u)*5), var(--black) 100%
            );
          background-position:
            0 0, 0 var(--scale), 0 calc(var(--scale)*2), 0 calc(var(--scale)*3), 0 calc(var(--scale)*4), 0 calc(var(--scale)*5), 0 calc(var(--scale)*6), 0 calc(var(--scale)*7), 0 calc(var(--scale)*8), 0 calc(var(--scale)*9), 0 calc(var(--scale)*10), 0 calc(var(--scale)*11), 0 calc(var(--scale)*12), 0 calc(var(--scale)*13), 0 calc(var(--scale)*14), 0 calc(var(--scale)*15), 0 calc(var(--scale)*16), 0 calc(var(--scale)*17), 0 calc(var(--scale)*18), 0 calc(var(--scale)*19), 0 calc(var(--scale)*20), 0 calc(var(--scale)*21), 0 calc(var(--scale)*22), 0 calc(var(--scale)*23), 0 calc(var(--scale)*24), 0 calc(var(--scale)*25), 0 calc(var(--scale)*26), 0 calc(var(--scale)*27), 0 calc(var(--scale)*28), 0 calc(var(--scale)*29), 0 calc(var(--scale)*30), 0 calc(var(--scale)*31), 0 calc(var(--scale)*32), 0 calc(var(--scale)*33), 0 calc(var(--scale)*34);
          background-size: 100% var(--scale);
          background-repeat: no-repeat;
          animation-name: tailSpriteCycle;
          animation-duration: calc(var(--speed)/2);
        }

        @keyframes tailCycle {
          0%, 100% { margin-top: 0; }
          33.3%    { margin-top: var(--scale); }
          50%      { margin-top: calc(var(--scale)*2); }
          66.7%    { margin-top: calc(var(--scale)*-1); }
        }

        @keyframes tailSpriteCycle {
          0%, 83.3% { margin-top: 0; }
          16.7%     { margin-top: calc(var(--scale)*-7); }
          33.3%     { margin-top: calc(var(--scale)*-14); }
          50%       { margin-top: calc(var(--scale)*-21); }
          66.7%     { margin-top: calc(var(--scale)*-28); }
        }

        /* ==================================
           Rainbow
           ================================== */
        .rainbow {
          left: 0;
          right: 20%;
          top: 50%;
          margin-top: calc(var(--scale)*-9);
          height: calc(var(--scale)*19);
          overflow: hidden;
        }

        .rainbow .sprite {
          left: 0;
          right: calc(var(--scale)*8);
          top: 0;
          bottom: 0;
          background-image:
            linear-gradient(to right, var(--red) 0%, var(--red) 50%, transparent 50%, transparent 100%),
            linear-gradient(to right, transparent 0%, transparent 50%, var(--red) 50%, var(--red) 100%),
            linear-gradient(to right, var(--orange) 0%, var(--orange) 50%, transparent 50%, transparent 100%),
            linear-gradient(to right, transparent 0%, transparent 50%, var(--orange) 50%, var(--orange) 100%),
            linear-gradient(to right, var(--yellow) 0%, var(--yellow) 50%, transparent 50%, transparent 100%),
            linear-gradient(to right, transparent 0%, transparent 50%, var(--yellow) 50%, var(--yellow) 100%),
            linear-gradient(to right, var(--green) 0%, var(--green) 50%, transparent 50%, transparent 100%),
            linear-gradient(to right, transparent 0%, transparent 50%, var(--green) 50%, var(--green) 100%),
            linear-gradient(to right, var(--light-blue) 0%, var(--light-blue) 50%, transparent 50%, transparent 100%),
            linear-gradient(to right, transparent 0%, transparent 50%, var(--light-blue) 50%, var(--light-blue) 100%),
            linear-gradient(to right, var(--blue) 0%, var(--blue) 50%, transparent 50%, transparent 100%),
            linear-gradient(to right, transparent 0%, transparent 50%, var(--blue) 50%, var(--blue) 100%);
          background-position:
            0 0, 0 var(--scale), 0 calc(var(--scale)*3), 0 calc(var(--scale)*4), 0 calc(var(--scale)*6), 0 calc(var(--scale)*7), 0 calc(var(--scale)*9), 0 calc(var(--scale)*10), 0 calc(var(--scale)*12), 0 calc(var(--scale)*13), 0 calc(var(--scale)*15), 0 calc(var(--scale)*16);
          background-size: calc(var(--scale)*16) calc(var(--scale)*3);
          background-repeat: repeat-x;
          animation-name: rainbowCycle;
          animation-duration: var(--speed);
        }

        @keyframes rainbowCycle {
          0%, 33.3%, 66.7%, 100% { left: 0; }
          16.7%, 50%, 83.3%      { left: calc(var(--scale)*-9); }
        }

        .rainbow .sprite:after {
          content: '';
          position: absolute;
          bottom: 0;
          right: 0;
          width: calc(var(--scale)*1.5);
          height: calc(var(--scale)*1.5);
          background: var(--sky-bg);
        }

        /* ==================================
           Stars
           ================================== */
        .stars li {
          width: calc(var(--scale)*47);
          height: calc(var(--scale)*7);
          overflow: hidden;
          margin-left: calc(var(--scale)*-4);
        }

        .stars li i {
          display: block;
          width: calc(var(--scale)*47);
          height: calc(var(--scale)*49);
          top: calc(var(--scale)*-42);
          background-image:
            /* frame 1 */
            linear-gradient(to right, white 0%, white 100%),
            /* frame 2 */
            linear-gradient(to right, white 0%, white 100%),
            linear-gradient(to right, white 0%, white 100%),
            linear-gradient(to right, white 0%, white 100%),
            linear-gradient(to right, white 0%, white 100%),
            /* frame 3 */
            linear-gradient(to right, white 0%, white 100%),
            linear-gradient(to right, white 0%, white 100%),
            linear-gradient(to right, white 0%, white 100%),
            linear-gradient(to right, white 0%, white 100%),
            /* frame 4 */
            linear-gradient(to right, white 0%, white 100%),
            linear-gradient(to right, white 0%, white 100%),
            linear-gradient(to right, white 0%, white 100%),
            linear-gradient(to right, white 0%, white 100%),
            linear-gradient(to right, white 0%, white 100%),
            /* frame 5 */
            linear-gradient(to right, white 0%, white 100%),
            linear-gradient(to right, white 0%, white 100%),
            linear-gradient(to right, white 0%, white 100%),
            linear-gradient(to right, white 0%, white 100%),
            linear-gradient(to right, white 0%, white 100%),
            linear-gradient(to right, white 0%, white 100%),
            linear-gradient(to right, white 0%, white 100%),
            linear-gradient(to right, white 0%, white 100%),
            /* frame 6 */
            linear-gradient(to right, white 0%, white 100%),
            linear-gradient(to right, white 0%, white 100%),
            linear-gradient(to right, white 0%, white 100%),
            linear-gradient(to right, white 0%, white 100%);
          background-position:
            /* frame 1 */
            calc(var(--scale)*43) calc(var(--scale)*3),
            /* frame 2 */
            calc(var(--scale)*35) calc(var(--scale)*9), calc(var(--scale)*34) calc(var(--scale)*10), calc(var(--scale)*36) calc(var(--scale)*10), calc(var(--scale)*35) calc(var(--scale)*11),
            /* frame 3 */
            calc(var(--scale)*27) calc(var(--scale)*15), calc(var(--scale)*25) calc(var(--scale)*17), calc(var(--scale)*28) calc(var(--scale)*17), calc(var(--scale)*27) calc(var(--scale)*18),
            /* frame 4 */
            calc(var(--scale)*19) calc(var(--scale)*21), calc(var(--scale)*16) calc(var(--scale)*24), calc(var(--scale)*19) calc(var(--scale)*24), calc(var(--scale)*21) calc(var(--scale)*24), calc(var(--scale)*19) calc(var(--scale)*26),
            /* frame 5 */
            calc(var(--scale)*11) calc(var(--scale)*28), calc(var(--scale)*9) calc(var(--scale)*29), calc(var(--scale)*13) calc(var(--scale)*29), calc(var(--scale)*8) calc(var(--scale)*31), calc(var(--scale)*14) calc(var(--scale)*31), calc(var(--scale)*9) calc(var(--scale)*33), calc(var(--scale)*13) calc(var(--scale)*33), calc(var(--scale)*11) calc(var(--scale)*34),
            /* frame 6 */
            calc(var(--scale)*3) calc(var(--scale)*35), 0 calc(var(--scale)*38), calc(var(--scale)*6) calc(var(--scale)*38), calc(var(--scale)*3) calc(var(--scale)*41);
          background-size:
            /* frame 1 */
            var(--scale) var(--scale),
            /* frame 2 */
            var(--scale) var(--scale), var(--scale) var(--scale), var(--scale) var(--scale), var(--scale) var(--scale),
            /* frame 3 */
            var(--scale) calc(var(--scale)*2), calc(var(--scale)*2) var(--scale), calc(var(--scale)*2) var(--scale), var(--scale) calc(var(--scale)*2),
            /* frame 4 */
            var(--scale) calc(var(--scale)*2), calc(var(--scale)*2) var(--scale), var(--scale) var(--scale), calc(var(--scale)*2) var(--scale), var(--scale) calc(var(--scale)*2),
            /* frame 5 */
            var(--scale) var(--scale), var(--scale) var(--scale), var(--scale) var(--scale), var(--scale) var(--scale), var(--scale) var(--scale), var(--scale) var(--scale), var(--scale) var(--scale), var(--scale) var(--scale),
            /* frame 6 */
            var(--scale) var(--scale), var(--scale) var(--scale), var(--scale) var(--scale), var(--scale) var(--scale);
          background-repeat: no-repeat;
          animation-name: starSpriteCycle;
          animation-duration: var(--speed);
        }

        @keyframes starSpriteCycle {
          0%, 100% { top: calc(var(--scale)*-42); }
          50%      { top: 0; }
          58.3%    { top: calc(var(--scale)*-7); }
          66.7%    { top: calc(var(--scale)*-14); }
          75%      { top: calc(var(--scale)*-21); }
          83.3%    { top: calc(var(--scale)*-28); }
          91.7%    { top: calc(var(--scale)*-35); }
        }

        .stars li:nth-child(1) { left: 66%; top: 80%; }
        .stars li:nth-child(2) { left: 70%; top: 54%; }
        .stars li:nth-child(2) i { animation-delay: calc(var(--speed)/12); }
        .stars li:nth-child(3) { left: 4%; top: 31%; }
        .stars li:nth-child(3) i { animation-delay: calc(var(--speed)/12*2); }
        .stars li:nth-child(4) { left: 49%; top: 12%; }
        .stars li:nth-child(4) i { animation-delay: calc(var(--speed)/12*3); }
        .stars li:nth-child(5) { left: 35%; top: 30%; }
        .stars li:nth-child(5) i { animation-delay: calc(var(--speed)/12*4); }
        .stars li:nth-child(6) { left: 48%; top: 29%; }
        .stars li:nth-child(6) i { animation-delay: calc(var(--speed)/12*5); }
        .stars li:nth-child(7) { left: 22%; top: 70%; }
        .stars li:nth-child(7) i { animation-delay: calc(var(--speed)/12*8); }
        .stars li:nth-child(8) { left: 56%; top: 67%; }
        .stars li:nth-child(8) i { animation-delay: calc(var(--speed)/12*7); }
        .stars li:nth-child(9) { left: 49%; top: 12%; }
        .stars li:nth-child(9) i { animation-delay: calc(var(--speed)/12*8); }
        .stars li:nth-child(10) { left: 9%; top: 92%; }
        .stars li:nth-child(10) i { animation-delay: calc(var(--speed)/12*9); }
        .stars li:nth-child(11) { left: 44%; top: 20%; }
        .stars li:nth-child(11) i { animation-delay: calc(var(--speed)/12*10); }
        .stars li:nth-child(12) { left: 6%; top: 19%; }
        .stars li:nth-child(12) i { animation-delay: calc(var(--speed)/12*11); }
      `}</style>
    </div>
  );
};

export default NyanCat;