// src/pages/Profile.js
import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import backgroundImg from '../assets/imax.jpg';
import Footer from "../components/Footer";
import {
  getProfile,
  getReservations,
  getFavorites,
  updateProfile,
} from "../api";
import { AuthContext } from "../context/AuthContext";

const PageContainer = styled.div`
background: url(${props => props.$backgroundImage}) center/cover no-repeat;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  min-height: 100vh;
  padding-top: 170px;
  
`;

const DashboardContainer = styled.div`
  background: rgba(255, 255, 255, 0.6); /* Transparence */
  backdrop-filter: blur(9px); /* Effet de flou */
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 50px;
  width: 80vw;
  height: 80vh;
  margin-bottom: 100px; /* Ajout d'un espace entre le dashboard et le footer */
`;


const Title = styled.h2`
  font-size: 2rem;
  margin-bottom: 90px;
  color: rgba(11, 15, 38, 1);;
`;

const Tabs = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
  cursor: pointer;
`;

const Tab = styled.div`
  padding: 15px 90px;
  border-radius: 5px;
  background: ${(props) => (props.active ? "#ff9800" : "rgba(11, 15, 38, 1)")};
  color: ${(props) => (props.active ? "#fff" : "#FFFFFF")};
  font-weight: ${(props) => (props.active ? "bold" : "normal")};
  margin-bottom: 80px;
  
  
`;

const ProfileItem = styled.div`
  margin-bottom: 20px;
  font-size: 1.5rem;
  color: rgba(11, 15, 38, 1);
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 230px;
`;

const LogoutButton = styled.button`
  background: #ff9800;
  color: #fff;
  padding: 10px 90px;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s, transform 0.3s, box-shadow 0.3s;

  &:hover {
    background: #e68900;
    transform: translateY(-2px);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
`;

const EditButton = styled.button`
  background: rgba(11, 15, 38, 1);
  color: #fff;
  padding: 10px 90px;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s, transform 0.3s, box-shadow 0.3s;
  margin-left: 10px;
  margin-right: 90px;

  &:hover {
    background: rgba(11, 15, 38, 0.8);
    transform: translateY(-2px);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
`;

const Profile = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [profile, setProfile] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    nom_utilisateur: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const profileData = await getProfile(localStorage.getItem("token"));
        console.log("Profil:", profileData);
        setProfile(profileData.user);
        setFormData({
          nom_utilisateur: profileData.user.nom_utilisateur,
          email: profileData.user.email,
          password: "",
        });
      } catch (error) {
        console.error("Erreur lors de la récupération du profil:", error);
        navigate("/login");
      }
    };

    const fetchReservations = async () => {
      try {
        const reservationsData = await getReservations();
        setReservations(reservationsData);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des réservations:",
          error
        );
      }
    };

    const fetchFavorites = async () => {
      try {
        const favoritesData = await getFavorites();
        setFavorites(favoritesData);
      } catch (error) {
        console.error("Erreur lors de la récupération des favoris:", error);
      }
    };

    fetchProfileData();
    fetchReservations();
    fetchFavorites();
  }, [navigate]);

  const handleLogout = () => {
    logout();
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = async () => {
    try {
      await updateProfile(formData);
      setProfile({ ...profile, ...formData });
      setEditMode(false);
    } catch (error) {
      console.error("Erreur lors de la mise à jour du profil:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (!profile) {
    return (
      <PageContainer>
        <Navbar />
        <p>Chargement...</p>
      </PageContainer>
    );
  }

  return (
    <PageContainer $backgroundImage={backgroundImg}>
      <Navbar />
      <DashboardContainer>
        <Title>Bienvenue {profile.nom_utilisateur} !</Title>
        <Tabs>
          <Tab
            active={activeTab === "profile"}
            onClick={() => setActiveTab("profile")}
          >
            Mon profil
          </Tab>
          <Tab
            active={activeTab === "reservations"}
            onClick={() => setActiveTab("reservations")}
          >
            Mes réservations
          </Tab>
          <Tab
            active={activeTab === "favorites"}
            onClick={() => setActiveTab("favorites")}
          >
            Ma watchlist
          </Tab>
        </Tabs>
        {activeTab === "profile" && (
          <div>
            <ProfileItem>
              <strong>Nom:</strong>{" "}
              {editMode ? (
                <input
                  type="text"
                  name="nom_utilisateur"
                  value={formData.nom_utilisateur}
                  onChange={handleInputChange}
                />
              ) : (
                profile.nom_utilisateur
              )}
            </ProfileItem>
            <ProfileItem>
              <strong>Email:</strong>{" "}
              {editMode ? (
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              ) : (
                profile.email
              )}
            </ProfileItem>
            <ProfileItem>
              <strong>Mot de passe:</strong>{" "}
              {editMode ? (
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
              ) : (
                "********"
              )}
            </ProfileItem>
            {editMode ? (
              <ButtonContainer>
                <EditButton onClick={handleSave}>Enregistrer</EditButton>
                <LogoutButton onClick={() => setEditMode(false)}>
                  Annuler
                </LogoutButton>
              </ButtonContainer>
            ) : (
              <ButtonContainer>
                <EditButton onClick={handleEdit}>Modifier</EditButton>
                <LogoutButton onClick={handleLogout}>Déconnexion</LogoutButton>
              </ButtonContainer>
            )}
          </div>
        )}
        {activeTab === "reservations" && (
          <div>
            <h3>Mes réservations</h3>
            {reservations.length === 0 ? (
              <p>Vous n'avez aucune réservation.</p>
            ) : (
              <ul>
                {reservations.map((reservation) => (
                  <li key={reservation.id}>{reservation.details}</li>
                ))}
              </ul>
            )}
          </div>
        )}
        {activeTab === "favorites" && (
          <div>
            <h3>Ma watchlist</h3>
            {favorites.length === 0 ? (
              <p>Vous n'avez aucun favori.</p>
            ) : (
              <ul>
                {favorites.map((favorite) => (
                  <li key={favorite.id}>{favorite.details}</li>
                ))}
              </ul>
            )}
          </div>
        )}
      </DashboardContainer>
      <Footer />
    </PageContainer>
  );
};

export default Profile;