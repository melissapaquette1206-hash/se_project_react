import { useEffect, useState, useCallback } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

import { coordinates, apiKey } from "../../utils/constants";
import { filterWeatherData, getWeather } from "../../utils/weatherApi";
import {
  getItems,
  addItem,
  deleteItem,
  addCardLike,
  removeCardLike,
  updateUser,
} from "../../utils/api";
import { authorize, register, checkToken } from "../../utils/auth";

import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnit";
import CurrentUserContext from "../../contexts/CurrentUserContext";

import Header from "../Header/Header";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import Footer from "../Footer/Footer";

import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: null, C: null },
    city: "",
    condition: "",
    isDay: false,
  });

  const [isWeatherLoaded, setIsWeatherLoaded] = useState(false);
  const [clothingItems, setClothingItems] = useState([]);
  const [isItemsLoading, setIsItemsLoading] = useState(false);

  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);
  const [cardToDelete, setCardToDelete] = useState(null);

  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  console.log("isLoggedIn:", isLoggedIn, "currentUser:", currentUser);

  const openModal = (name) => setActiveModal(name);

  const closeAllModals = useCallback(() => {
    setActiveModal("");
    setSelectedCard(null);
    setCardToDelete(null);
  }, []);

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit((prev) => (prev === "F" ? "C" : "F"));
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
    openModal("preview");
  };

  const handleAddClick = () => {
    const token = localStorage.getItem("jwt");
    if (!token || !isLoggedIn) {
      openModal("login");
      return;
    }
    openModal("add-garment");
  };

  const handleCardLike = ({ _id, likes }) => {
    const token = localStorage.getItem("jwt");
    if (!token) return;

    const isLiked = likes.some((id) => id === currentUser._id);

    const request = isLiked
      ? removeCardLike(_id, token)
      : addCardLike(_id, token);

    request
      .then((updatedCard) => {
        setClothingItems((items) =>
          items.map((item) => (item._id === _id ? updatedCard : item)),
        );
      })
      .catch(console.error);
  };

  const onAddItem = (data) => {
    const token = localStorage.getItem("jwt");
    if (!token) return openModal("login");

    addItem(data, token)
      .then((item) => {
        setClothingItems((prev) => [item, ...prev]);
        closeAllModals();
      })
      .catch(console.error);
  };

  const handleDeleteItem = () => {
    const token = localStorage.getItem("jwt");
    if (!token || !cardToDelete) return;

    deleteItem(cardToDelete._id, token)
      .then(() => {
        setClothingItems((items) =>
          items.filter((item) => item._id !== cardToDelete._id),
        );
      })
      .catch(console.error)
      .finally(closeAllModals);
  };

  const handleLogin = ({ email, password }) => {
    return authorize({ email, password })
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setIsLoggedIn(true);
        return checkToken(res.token);
      })
      .then((user) => {
        setCurrentUser(user);
        closeAllModals();
      })
      .catch(console.error);
  };

  const handleRegister = ({ name, avatar, email, password }) => {
    return register({ name, avatar, email, password })
      .then(() => handleLogin({ email, password }))
      .catch(console.error);
  };

  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  const handleUpdateUser = (data) => {
    const token = localStorage.getItem("jwt");

    return updateUser(data, token)
      .then((user) => {
        setCurrentUser(user);
        closeAllModals();
      })
      .catch(console.error);
  };

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) return;

    checkToken(token)
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
      })
      .catch(() => {
        localStorage.removeItem("jwt");
      });
  }, []);

  useEffect(() => {
    getWeather(coordinates, apiKey)
      .then((data) => {
        const filtered = filterWeatherData(data);
        const tempF = filtered.temp.F;
        const tempC = Math.round(((tempF - 32) * 5) / 9);

        setWeatherData({ ...filtered, temp: { F: tempF, C: tempC } });
        setIsWeatherLoaded(true);
      })
      .catch(console.error);

    setIsItemsLoading(true);
    getItems()
      .then((items) => setClothingItems(items.data))
      .catch(console.error)
      .finally(() => setIsItemsLoading(false));
  }, []);

  useEffect(() => {
    if (!activeModal) return;

    const handleEsc = (e) => e.key === "Escape" && closeAllModals();
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [activeModal, closeAllModals]);

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
          <Header
            handleAddClick={handleAddClick}
            weatherData={weatherData}
            isLoggedIn={isLoggedIn}
            openLogin={() => openModal("login")}
            openRegister={() => openModal("register")}
          />

          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  handleCardClick={handleCardClick}
                  clothingItems={clothingItems}
                  isItemsLoading={isItemsLoading}
                  onCardLike={handleCardLike}
                  isLoggedIn={isLoggedIn}
                />
              }
            />

            <Route
              path="/profile"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <Profile
                    clothingItems={clothingItems}
                    onCardClick={handleCardClick}
                    onAddClick={handleAddClick}
                    onCardLike={handleCardLike}
                    onSignOut={handleSignOut}
                    onEditProfile={() => openModal("edit-profile")}
                  />
                </ProtectedRoute>
              }
            />
          </Routes>

          <Footer />

          <AddItemModal
            isOpen={activeModal === "add-garment"}
            onClose={closeAllModals}
            onAddItem={onAddItem}
          />

          <ItemModal
            activeModal={activeModal}
            card={selectedCard}
            onClose={closeAllModals}
            onDeleteCard={(card) => {
              setCardToDelete(card);
              openModal("confirm-delete");
            }}
          />

          <DeleteConfirmationModal
            isOpen={activeModal === "confirm-delete"}
            onConfirm={handleDeleteItem}
            onCancel={closeAllModals}
          />

          <RegisterModal
            isOpen={activeModal === "register"}
            onClose={closeAllModals}
            onRegister={handleRegister}
          />

          <LoginModal
            isOpen={activeModal === "login"}
            onClose={closeAllModals}
            onLogin={handleLogin}
          />

          <EditProfileModal
            isOpen={activeModal === "edit-profile"}
            onClose={closeAllModals}
            onUpdateUser={handleUpdateUser}
          />
        </div>
      </CurrentUserContext.Provider>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
