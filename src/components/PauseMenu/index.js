import React from 'react'
import { View } from 'components'
import Modal from 'react-modal'

import styles from './styles.css'

const PauseMenu = ({ paused, onClose }) => (
  <Modal
    isOpen={paused}
    onRequestClose={onClose}
    contentLabel='Pause menu'>
    <View className={styles.pauseModal}>Foo</View>
  </Modal>
)

export default PauseMenu
