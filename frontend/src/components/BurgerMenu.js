
const BurgerMenu = ({ isOpen, OnBurgerClick }) => {

  return (
    <>
      <button className={`header__burger ${isOpen ? 'header__burger_active' : ''}`} type="button" onClick={OnBurgerClick}>
        <span className="header__burger-line" />
      </button>
    </>
  )
}
export default BurgerMenu