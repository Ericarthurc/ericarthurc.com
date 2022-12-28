import { Component } from 'solid-js';

const Header: Component = () => {
  return (
    <div class="header">
      <div class="header-logo">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 1500 1500"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;"
        >
          <path
            id="shape_fill"
            d="M1500,750l-750,-750l-750,750l750,750l750,-750Z"
            style="fill:none;"
          />
          <g>
            <g class="header-logo-outer-spin">
              <path
                d="M1185.85,749.999l-435.926,-435.923l-298.059,298.059l167.329,-0l130.977,-130.978l268.811,268.842l-268.811,268.844l-130.977,-130.978l-167.329,0l298.059,298.059l435.926,-435.925Z"
                style="fill:#0051ff;"
              />
              <path
                d="M590.109,802.2l0.001,-104.4l-369.145,0l529.084,-529.084l449.843,449.842l168.666,0l-618.558,-618.558l-750,750l750,750l618.558,-618.558l-168.666,-0l-449.843,449.842l-529.084,-529.084l369.144,-0Z"
                style="fill:#4d85ff;"
              />
            </g>
            <path
              class="header-logo-inner-spin"
              d="M871.477,750l-121.429,-121.429l-121.429,121.429l121.429,121.429l121.429,-121.429Z"
              style="fill:#4d85ff;"
            />
          </g>
        </svg>
      </div>
    </div>
  );
};

export default Header;
