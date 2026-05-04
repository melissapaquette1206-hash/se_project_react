import "./Profile.css";
import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";

export default function Profile({
  clothingItems,
  onCardClick,
  onAddClick,
  onSignOut,
  onEditProfile,
  onCardLike,
}) {
  return (
    <main className="profile">
      <div className="profile__container">
        <SideBar onSignOut={onSignOut} onEditProfile={onEditProfile} />
        <ClothesSection
          onCardClick={onCardClick}
          clothingItems={clothingItems}
          onAddClick={onAddClick}
          onCardLike={onCardLike}
        />
      </div>
    </main>
  );
}
