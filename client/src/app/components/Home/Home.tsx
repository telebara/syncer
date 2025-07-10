import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { FloatingActionButton, CreateCardPopup } from "..";
import { UserDTO } from "../../../types/auth";
import { CardDTO } from "../../../types/cards";
import { CardsServiceImpl } from "../../../services/cards-service";
import { httpClient } from "../../../services/http-client";
import { Library } from "..";

const cardsService = new CardsServiceImpl(httpClient);

const HomePage = ({ user }: { user: UserDTO }) => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [cards, setCards] = useState<CardDTO[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCards();
  }, []);

  const loadCards = async () => {
    try {
      setLoading(true);
      const cardsData = await cardsService.getCards();
      setCards(cardsData);
    } catch (error) {
      console.error("Failed to load cards:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateSuccess = () => {
    loadCards();
  };

  const handleCardDeleted = () => {
    loadCards();
  };

  return (
    <>
      {loading ? (
        <div style={{ color: "#fff", textAlign: "center", marginTop: 20 }}>
          Загрузка карточек...
        </div>
      ) : (
        <Library videos={cards} onCardDeleted={handleCardDeleted} />
      )}

      <FloatingActionButton
        onClick={() => setShowCreateModal(true)}
        visible={true}
      />

      {showCreateModal && (
        <CreateCardPopup
          onClose={() => setShowCreateModal(false)}
          onSuccess={handleCreateSuccess}
        />
      )}
    </>
  );
};

export default HomePage;
