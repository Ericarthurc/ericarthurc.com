import { A } from '@solidjs/router';
import { Component } from 'solid-js';

const Navbar: Component = () => {
  return (
    <nav class="navbar" id="navbar">
      <A class="navbar-link" end={true} href="/blog">
        BLOG
      </A>
      <A class="navbar-link" end={true} href="/series">
        SERIES
      </A>
      <A class="navbar-link" end={true} href="/about">
        ABOUT ME
      </A>
    </nav>
  );
};

export default Navbar;
