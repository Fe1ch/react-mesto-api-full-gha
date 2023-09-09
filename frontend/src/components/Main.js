import { Outlet } from 'react-router-dom';
import Card from './Card';
import Profile from './Profile';
import Spinner from './Spinner';

const Main = ({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  cards,
  isPreloading,
  onCardLike,
  onCardDelete
}) => {
  return (
    <main className='content'>
      <Profile
        onEditProfile={onEditProfile}
        onAddPlace={onAddPlace}
        onEditAvatar={onEditAvatar}
      />

      <section className="elements">
        {isPreloading ? <Spinner /> :
          <ul className="elements__container">
            {
              cards.map((card) =>
                <Card
                  card={card}
                  key={card._id}
                  onCardClick={onCardClick}
                  onCardLike={onCardLike}
                  onCardDelete={onCardDelete}
                />
              )}
          </ul>
        }
      </section>
      <Outlet />
    </main>
  )
}
export default Main