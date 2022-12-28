import { Component, createEffect } from 'solid-js';

const Themer: Component = () => {
  createEffect(() => {
    let theme = localStorage.getItem('theme');
    let themeSwitcherInput: HTMLInputElement | null =
      document.querySelector('#themeSwitch');

    if (themeSwitcherInput) {
      if (theme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
        themeSwitcherInput.checked = false;
      } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeSwitcherInput.checked = true;
      }

      themeSwitcherInput.addEventListener('change', (e) => {
        let target = e.target as HTMLInputElement;
        if (target != null) {
          if (target.checked) {
            localStorage.setItem('theme', 'dark');
            document.documentElement.setAttribute('data-theme', 'dark');
          } else {
            localStorage.setItem('theme', 'light');
            document.documentElement.setAttribute('data-theme', 'light');
          }
        }
      });
    }
  });

  return (
    <div class="theme-switcher">
      <label class="theme-switcher-container">
        <input
          class="theme-switcher-container-input"
          id="themeSwitch"
          type="checkbox"
        />
        <span class="theme-switcher-container-span"></span>
      </label>
    </div>
  );
};

export default Themer;
