import React, { useState } from 'react';
import styled from 'styled-components';

const ReservationContainer = styled.div`
  font-family: 'Poppins', sans-serif;
  color: #fff;
  background-color: #1c1c1c;
  min-height: 100vh;
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SelectorContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #2c2c2c;
  padding: 15px;
  border-radius: 10px;
  margin-bottom: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const SelectorButton = styled.button`
  background-color: ${({ active }) => (active ? '#ffcc00' : '#444')};
  color: ${({ active }) => (active ? '#000' : '#fff')};
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;

  &:hover {
    background-color: #ff9900;
    transform: scale(1.05);
  }
`;

const DateSelector = styled(SelectorContainer)`
  justify-content: space-evenly;
`;

const TimeSelector = styled(SelectorContainer)`
  justify-content: space-evenly;
`;

const SeatSelector = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #2c2c2c;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const SeatGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 10px;
  margin: 20px 0;
`;

const Seat = styled.div`
  width: 40px;
  height: 40px;
  background-color: ${({ selected }) => (selected ? '#ffcc00' : '#666')};
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;

  &:hover {
    background-color: ${({ selected }) => (selected ? '#ff9900' : '#888')};
    transform: scale(1.1);
  }
`;

const ReservationButton = styled.button`
  background-color: #ffcc00;
  color: #000;
  padding: 15px 30px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;

  &:hover {
    background-color: #ff9900;
    transform: scale(1.05);
  }
`;

const CinemaName = styled.h2`
  font-size: 1.5rem;
  margin: 10px 0;
`;

const TimeText = styled.span`
  font-size: 1.2rem;
  margin-bottom: 10px;
`;

const Reservation = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);

  const dates = ['lun. 15 juil.', 'mar. 16 juil.', 'mer. 17 juil.', 'jeu. 18 juil.', 'ven. 19 juil.', 'sam. 20 juil.'];
  const times = ['13:10', '15:00', '17:30', '20:00'];

  const toggleSeatSelection = (seat) => {
    setSelectedSeats(prev =>
      prev.includes(seat)
        ? prev.filter(s => s !== seat)
        : [...prev, seat]
    );
  };

  return (
    <ReservationContainer>
      <SelectorContainer>
        <span>Où ?</span>
        <SelectorButton>Autour de moi</SelectorButton>
        <SelectorButton>Cinémas favoris</SelectorButton>
      </SelectorContainer>
      <DateSelector>
        {dates.map((date, index) => (
          <SelectorButton
            key={index}
            active={selectedDate === date}
            onClick={() => setSelectedDate(date)}
          >
            {date}
          </SelectorButton>
        ))}
      </DateSelector>
      {selectedDate && (
        <TimeSelector>
          {times.map((time, index) => (
            <SelectorButton
              key={index}
              active={selectedTime === time}
              onClick={() => setSelectedTime(time)}
            >
              {time}
            </SelectorButton>
          ))}
        </TimeSelector>
      )}
      {selectedTime && (
        <>
          <SelectorContainer>
            <CinemaName>Pathé Valence</CinemaName>
            <TimeText>{selectedTime}</TimeText>
          </SelectorContainer>
          <SeatSelector>
            <h3>Sélectionnez vos places</h3>
            <SeatGrid>
              {Array.from({ length: 64 }).map((_, index) => (
                <Seat
                  key={index}
                  selected={selectedSeats.includes(index)}
                  onClick={() => toggleSeatSelection(index)}
                />
              ))}
            </SeatGrid>
            <ReservationButton>Réserver maintenant</ReservationButton>
          </SeatSelector>
        </>
      )}
    </ReservationContainer>
  );
};

export default Reservation;