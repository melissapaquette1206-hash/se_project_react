import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import "./App.css";
import { coordinates, apiKey } from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import AddItemModal from "../AddItemModal/AddItemModal";
import Profile from "../Profile/Profile";
import { filterWeatherData, getWeather } from "../../utils/weatherApi";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnit";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";
import { addItem, deleteItem, getItems } from "../../utils/api";

const [currentUser, setCurrentUser] = useState(null);
const [isLoggedIn, setIsLoggedIn] = useState(false);
const [clothingItems, setClothingItems] = useState([]);
const [activeModal, setActiveModal] = useState("");
const [selectedCard, setSelectedCard] = useState(null);
const currentUser = useContext(CurrentUserContext);

{
  isLoggedIn ? (
    <div>
      <p>{currentUser.name}</p>
      <img src={currentUser.avatar} />
    </div>
  ) : (
    <>
      <button onClick={openLogin}>Sign In</button>
      <button onClick={openRegister}>Register</button>
    </>
  );
}

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
    condition: "",
    isDay: false,
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState();
  const [clothingItems, setClothingItems] = useState([]);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  const token = localStorage.getItem("jwt");
  api.addItem(data, token);

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleDeleteClick = (card) => {
    setSelectedCard(card);
    setActiveModal("confirm-delete");
  };

  const handleLogin = ({ email, password }) => {
    authorize({ email, password })
      .then((res) => {
        localStorage.setItem("jwt", res.token);

        return checkToken(res.token);
      })
      .then((userData) => {
        setCurrentUser(userData);
        setIsLoggedIn(true);
        closeModal();
      })
      .catch((err) => console.log(err));
  };

  const handleRegister = ({ name, avatar, email, password }) => {
    register({ name, avatar, email, password })
      .then(() => handleLogin({ email, password }))
      .catch((err) => console.log(err));
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem("jwt");

    const request = !isLiked
      ? api.addCardLike(id, token)
      : api.removeCardLike(id, token);

    request
      .then((updatedCard) => {
        setClothingItems((cards) =>
          cards.map((item) => (item._id === id ? updatedCard : item)),
        );
      })
      .catch((err) => console.log(err));
  };

  const userItems = clothingItems.filter(
    (item) => item.owner === currentUser._id,
  );

  const handleUpdateUser = (data) => {
    const token = localStorage.getItem("jwt");

    api
      .updateUser(data, token)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        closeModal();
      })
      .catch((err) => console.log(err));
  };

  const onAddItem = (inputValues, resetForm) => {
    const newCardData = {
      name: inputValues.name,
      imageUrl: inputValues.imageUrl,
      weather: inputValues.weather,
    };

    addItem(newCardData)
      .then((data) => {
        setClothingItems([data, ...clothingItems]);
        closeActiveModal();
        resetForm();
      })
      .catch(console.error);
  };
  const handleDeleteItem = (item = selectedCard) => {
    const id = item?._id ?? item?.id;
    if (!id) {
      return;
    }
    deleteItem(id)
      .then(() => {
        setClothingItems(
          clothingItems.filter(
            (existingItem) => (existingItem._id ?? existingItem.id) !== id,
          ),
        );
        closeActiveModal();
      })
      .catch(console.error);
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  useEffect(() => {
    if (!activeModal) return;
    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        closeActiveModal();
      }
    };
    document.addEventListener("keydown", handleEscClose);
    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]);

  useEffect(() => {
    getWeather(coordinates, apiKey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    getItems()
      .then((data) => {
        const normalizedItems = data
          .map((item) => ({
            ...item,
            imageUrl: item.imageUrl ?? item.link,
          }))
          .filter((item) => item.imageUrl);
        setClothingItems(normalizedItems);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("jwt");

    if (!token) return;

    checkToken(token)
      .then((userData) => {
        setCurrentUser(userData);
        setIsLoggedIn(true);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <div className="page">
            <div className="page__content">
              <Header
                handleAddClick={handleAddClick}
                weatherData={weatherData}
              />
              <Routes>
                <Route
                  path="/"
                  element={
                    <Main
                      weatherData={weatherData}
                      handleCardClick={handleCardClick}
                      clothingItems={clothingItems}
                    />
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <Profile
                      handleCardClick={handleCardClick}
                      clothingItems={clothingItems}
                      onAddClick={handleAddClick}
                    />
                  }
                />
              </Routes>

              <Footer />
            </div>
            <AddItemModal
              isOpen={activeModal === "add-garment"}
              onClose={closeActiveModal}
              onAddItem={onAddItem}
            />
            <ItemModal
              activeModal={activeModal}
              card={selectedCard}
              onClose={closeActiveModal}
              onDeleteClick={handleDeleteClick}
            />
            <DeleteConfirmationModal
              isOpen={activeModal === "confirm-delete"}
              onClose={closeActiveModal}
              onDelete={handleDeleteItem}
            />
          </div>
        </CurrentTemperatureUnitContext.Provider>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
