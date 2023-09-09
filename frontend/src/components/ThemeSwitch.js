import { useEffect, useState } from "react";

const ThemeSwitch = () => {

  const [indicator, setIndicator] = useState(false);

  const handleToggleContainer = indicator ? 'header__container_active' : '';
  const handleToggleIndicator = indicator ? 'header__indicator_active' : '';
  const handleToggleIcon = indicator ? 'header__icon_active' : '';


  const switchTheme = () => {
    setIndicator(state => !state)
    const lightMode = document.body.toggleAttribute('lightmode');
    localStorage.setItem('theme', lightMode ? 'light' : 'dark');
  }
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      switchTheme();
    }
  }, [])

  return (

    <div className={`header__container ${handleToggleContainer}`}>
      <i onClick={() => switchTheme()} className={`header__indicator ${handleToggleIndicator}`} />
      <i className={`header__icon ${handleToggleIcon}`} />
    </div>

  )

}
export default ThemeSwitch