import React from 'react';
import styles from './index.module.scss';
import classNames from 'classnames/bind';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import values from 'lodash.values';
import {
  attackPlayer,
  gameState,
  moveArmy,
  placeArmies,
  selectZoneFrom,
  selectZoneTo,
  showGameModal,
  TurnState,
} from '../../store/game';
import { PlayerList } from './PlayerList';
import { GameControls } from './GameControls';
import { Earth } from '../../components/maps/Earth';
import { YourTurnNotification } from '../../components/modals/YourTurnNotification';
import { useMyTurn } from './useMyTurn';
import { AttackNotification } from '../../components/modals/AttackNotification';
import { useAttackNotification } from './useAttackNotification';
import { usePlaceArmyNotification } from './usePlaceArmyNotification';
import { useGetGameInfo } from './useGetGameInfo';
import { userState } from '../../store/user';
import { AttackAction } from '../../components/modals/AttackAction';
import { MoveAction } from '../../components/modals/MoveAction';
import { ModalType } from '../../store/app';
import { ContinentTaken } from '../../components/modals/ContinentTaken';
import { EliminatePlayer } from '../../components/modals/EliminatePlayer';
import { Chat } from './Chat';

const cx = classNames.bind(styles);

export const Game = () => {
  const { activeGame, interactions, gameModal } = useSelector(gameState);
  const user = useSelector(userState);
  const { myTurn } = useMyTurn();
  const { attackNotification, showAttackNotification } =
    useAttackNotification();
  const { placeArmyModal, showPlaceArmyModal } = usePlaceArmyNotification();
  useGetGameInfo();

  const dispatch = useDispatch();
  const { gameId } = useParams() as { gameId: string; type: string };

  if (!activeGame?.map) return null;

  const currentPlayerId = activeGame?.currentPlayer?.id;
  const { zoneTo, zoneFrom, zoneSelected } = interactions;
  const myColor = activeGame.players.find((p) => p.id === user.data.id);

  const setZoneFrom = (zone: string) => {
    if (!activeGame.map) return;
    if (activeGame.map.zones[zone].owner !== user.data.id) return;
    if (activeGame.turnState === TurnState.Attack) {
      dispatch(selectZoneFrom({ zone }));
      dispatch(selectZoneTo({ zone: undefined }));
    } else if (activeGame.turnState === TurnState.Move) {
      if (!zoneFrom) dispatch(selectZoneFrom({ zone }));
    }
  };

  const setZoneTo = (zone: string) => {
    if (!activeGame.map || !zoneFrom) return;
    if (activeGame.turnState === TurnState.Attack) {
      if (activeGame.map.zones[zone].owner === user.data.id) return;
      const neighbours = activeGame.map.zones[zoneFrom].neighbours;
      if (!neighbours.includes(zone)) return;
      dispatch(selectZoneTo({ zone }));
      dispatch(showGameModal({ type: ModalType.AttackZone }));
    } else if (activeGame.turnState === TurnState.Move) {
      if (activeGame.map.zones[zone].owner !== user.data.id) return;
      const neighbours = activeGame.map.zones[zoneFrom].neighbours;
      if (!neighbours.includes(zone)) return;
      dispatch(selectZoneTo({ zone }));
      dispatch(showGameModal({ type: ModalType.MoveArmy }));
    }
  };

  const onZoneClick = (zone: string) => {
    if (!myTurn) return;
    if (activeGame.turnState === TurnState.PlaceArmies) {
      dispatch(placeArmies({ zone }));
    } else if (
      activeGame.turnState === TurnState.Attack ||
      activeGame.turnState === TurnState.Move
    ) {
      console.log(66);
      setZoneFrom(zone);
      setZoneTo(zone);
    }
  };

  const attack = (amount: number) => {
    if (!zoneFrom || !zoneTo) return;
    dispatch(showGameModal({}));
    dispatch(selectZoneFrom({}));
    dispatch(selectZoneTo({}));
    dispatch(attackPlayer({ amount, zoneFrom, zoneTo }));
  };

  const move = (amount: number) => {
    if (!zoneFrom || !zoneTo) return;
    dispatch(showGameModal({}));
    dispatch(selectZoneFrom({}));
    dispatch(selectZoneTo({}));
    dispatch(moveArmy({ amount, zoneFrom, zoneTo }));
  };

  const closeMoveModal = () => {
    dispatch(showGameModal({}));
    dispatch(selectZoneFrom({}));
    dispatch(selectZoneTo({}));
  };

  const conqueredContinents = values(activeGame.map.continents)
    .filter((c) => c.owner)
    .map((c) => ({ name: c.name, owner: c.owner! }));

  return (
    <div className={cx('game', `game--${myColor?.color}`)}>
      <ContinentTaken />
      <EliminatePlayer />
      <MoveAction
        onClose={closeMoveModal}
        maxAmount={activeGame.map?.zones[zoneFrom || '']?.armies || 0}
        onMove={move}
        zoneTo={zoneTo}
        zoneFrom={zoneFrom}
        isVisible={gameModal.type === ModalType.MoveArmy}
      />
      <AttackAction
        onClose={() => showGameModal({ type: ModalType.AttackZone })}
        maxAmount={activeGame.map?.zones[zoneFrom || '']?.armies || 0}
        onAttack={attack}
        isVisible={gameModal.type === ModalType.AttackZone}
        zoneFrom={zoneFrom}
        zoneTo={zoneTo}
      />
      <YourTurnNotification
        isVisible={placeArmyModal}
        armies={activeGame.armiesThisTurn || 0}
        onClose={() => showPlaceArmyModal(false)}
      />
      <AttackNotification
        onClose={() => showAttackNotification(false)}
        isVisible={attackNotification}
      />
      <PlayerList
        players={activeGame?.players}
        currentPlayerId={currentPlayerId}
      />
      <div className={cx('game-map')}>
        <Earth
          myTurn={myTurn}
          zoneFrom={zoneFrom}
          zoneSelected={zoneSelected}
          zoneTo={zoneTo}
          players={activeGame?.players}
          conqueredContinents={conqueredContinents}
          map={activeGame?.map}
          onClick={onZoneClick}
          className={cx('map')}
        />
      </div>
      <GameControls
        gameId={gameId}
        currentPlayer={activeGame.currentPlayer}
        turnState={activeGame.turnState}
        armiesThisTurn={activeGame.armiesThisTurn}
        myTurn={myTurn}
      />
      <Chat />
    </div>
  );
};
