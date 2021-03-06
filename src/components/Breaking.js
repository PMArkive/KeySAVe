import PropTypes from 'prop-types';
import React from 'react';
import FileOpener from './FileOpener';
import { importKeySAV2Config } from '../configuration';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import WarningIcon from 'material-ui/svg-icons/alert/warning';
import ErrorIcon from 'material-ui/svg-icons/alert/error';
import CircularProgress from 'material-ui/CircularProgress';
import DocumentationLink from './DocumentationLink';
import styles from './Breaking.module.scss';
import * as colors from 'material-ui/styles/colors';

const fileOptions = {
  filters: [
    { name: 'SAV (1MB)', extensions: ['bin', 'sav'] },
    { name: 'Battle Video', extensions: [process.platform === 'darwin' ? '' : '*'] },
  ],
};

const nameMap = {
  sav: 'Save',
  bv: 'Battle Video',
  none: '',
  neither: 'Neither',
};

const WarningSign = () => (
  <div className={styles.iconContainer}>
    <WarningIcon color={colors.yellow600} />
  </div>
);
const ErrorSign = () => (
  <div className={styles.iconContainer}>
    <ErrorIcon color={colors.red800} />
  </div>
);

const saveSuccessMessages = {
  // Save breaking success messages
  CREATED_NEW: (
    <div>
      <p>A key for this save was successfully created.</p>
      <p>Saving twice will not be required.</p>
      <p>Please remember that only slots 1-6 in the first two boxes are fully unlocked.</p>
    </div>
  ),
  CREATED_OLD: (
    <div>
      <p>A key for this save was successfully created.</p>
      <p>
        Saving twice will be required. It is recommended you upgrade at the earliers convenience.
      </p>
      <p>Please remember that only slots 1-6 in the first two boxes are fully unlocked.</p>
    </div>
  ),
  UPGRADED: (
    <div>
      <p>Your key for this save was successfully upgraded to a new style key.</p>
      <p>Saving twice will no longer be required.</p>
    </div>
  ),
  NOT_UPGRADED: (
    <div>
      <WarningSign />
      <p>Your key for this save could not be upgraded to a new style key.</p>
      <p>Please follow the instructions.</p>
    </div>
  ),
};

function getSuccessMessage(reply) {
  if (reply === undefined) {
    return null;
  }

  const { type, result } = reply;

  if (type === 'SAV') {
    return saveSuccessMessages[result];
  }

  if (type !== 'BV') {
    return (
      <div>
        <ErrorSign />
        <p>An unknown error occured.</p>
      </div>
    );
  }

  const availableKeys = ['Your team', 'Opponent team 1', 'Opponent team 2', 'Opponent team 3']
    .filter((e, i) => result.workingKeys[i])
    .join(', ');
  if (result.upgraded === undefined) {
    return (
      <div>
        <p>A key for this battle video slot was successfully created.</p>
        <p>You can dump these teams with it: {availableKeys}.</p>
      </div>
    );
  }
  if (result.upgraded === false) {
    return (
      <div>
        <WarningSign />
        <p>Your key for this battle video could not be upgraded with any new teams.</p>
        <p>You can dump these teams with it: {availableKeys}.</p>
      </div>
    );
  }
  if (result.upgraded === true) {
    return (
      <div>
        <p>Your key for this battle video could be upgraded with new teams!</p>
        <p>You can dump these teams with it: {availableKeys}.</p>
      </div>
    );
  }

  return (
    <div>
      <ErrorSign />
      <p>An unknown error occured.</p>
    </div>
  );
}

const errorMessages = {
  // Battle video breaking failure messages
  NotABattleVideoError: e => (
    <div>
      <ErrorSign />
      <p>Unfortunately the {['first', 'second'][e.file - 1]} file is not a valid battle video!</p>
    </div>
  ),
  NotSameBattleVideoSlotError: () => (
    <div>
      <ErrorSign />
      <p>
        The two battle videos you're using are not from the same battle video slot and cannot be
        used together top create a key!
      </p>
      <p>Please follow the instructions.</p>
    </div>
  ),
  BattleVideoKeyAlreadyExistsError: () => (
    <div>
      <WarningSign />
      <p>You already have a key for this batte video slot!</p>
      <p>Decryption of opponent data is supported on this slot!</p>
    </div>
  ),
  BattleVideosNotSameGenerationError: () => (
    <div>
      <ErrorSign />
      <p>The two battle videos you selected are not from the same generation!</p>
      <p>Please follow the instructions.</p>
    </div>
  ),

  // Save breaking error messages
  NotASaveError: e => (
    <div>
      <ErrorSign />
      <p>Unfortunately the {['first', 'second'][e.file - 1]} file is not a valid save file.</p>
    </div>
  ),
  NotSameGameError: () => (
    <div>
      <ErrorSign />
      <p>
        The two save files are not from the same game and cannot be used together to create a key.
      </p>
      <p>Please follow the instructions.</p>
    </div>
  ),
  SaveIdenticalError: () => (
    <div>
      <ErrorSign />
      <p>The two save files are identical.</p>
      <p>Please follow the instructions.</p>
    </div>
  ),
  SaveKeyAlreadyExistsError: () => (
    <div>
      <WarningSign />
      <p>You already have a key for this save file that does not require saving twice.</p>
    </div>
  ),
  NoBoxesError: () => (
    <div>
      <ErrorSign />
      <p>Could not find your boxes in the save file.</p>
      <p>
        This error occurs if you did not follow the instructions or are using an unsupported game.
      </p>
      <p>Please follow the instructions.</p>
    </div>
  ),
  PokemonNotSuitableError: () => (
    <div>
      <ErrorSign />
      <p>The six Pokémon you used for the breaking process are not suitable.</p>
      <p>There is a one in 4096 chance for this to happen.</p>
      <p>Please use six different Pokémon and start over!</p>
    </div>
  ),

  SavesNotSameGenerationError: () => (
    <div>
      <ErrorSign />
      <p>The two saves you selected are not from the same generation!</p>
      <p>Please follow the instructions.</p>
    </div>
  ),

  KeySavingError: () => (
    <div>
      <ErrorSign />
      <p>Unfortunately there was an error saving your key.</p>
      <p>Please check if your hard drive is working correctly and you have proper permissions.</p>
    </div>
  ),
};

export default class Breaking extends React.Component {
  static propTypes = {
    file1: PropTypes.object,
    file1Type: PropTypes.string.isRequired,
    file2: PropTypes.object,
    file2Type: PropTypes.string.isRequired,
    breakState: PropTypes.string.isRequired,
    scanning: PropTypes.bool.isRequired,
    reply: PropTypes.object,
    openFile1: PropTypes.func.isRequired,
    openFile2: PropTypes.func.isRequired,
    breakKey: PropTypes.func.isRequired,
    dismissBreakState: PropTypes.func.isRequired,
    scanFolder: PropTypes.func.isRequired,
    scanFolderFinish: PropTypes.func.isRequired,
  };

  static contextTypes = {
    store: PropTypes.object,
  };

  break = () => this.props.breakKey(this.props.file1, this.props.file2);
  closeDialog = () => this.props.dismissBreakState();

  render() {
    return (
      <div>
        <div className={`${styles.centerOnView} ${this.props.scanning ? '' : styles.hideCenter}`}>
          <div className={styles.progressWrapper}>
            <CircularProgress />
          </div>
        </div>
        <Dialog
          className={styles.dialog}
          open={this.props.breakState !== 'NONE'}
          actions={[<FlatButton onClick={this.closeDialog} label="OK" primary />]}
        >
          {this.props.breakState === 'ERROR'
            ? errorMessages.hasOwnProperty(this.props.reply.name)
              ? errorMessages[this.props.reply.name](this.props.reply)
              : `An unknown error occured: ${this.props.reply}`
            : getSuccessMessage(this.props.reply)}
        </Dialog>
        <Paper className={styles.paper}>
          <div className={`${styles.flexRow} ${styles.flexStretch}`}>
            <div className={styles.flexFill}>
              <div className={styles.flexRow}>
                <div className={styles.flexFill}>
                  <FileOpener
                    file={this.props.file1}
                    fileOpened={this.props.openFile1}
                    inputText="File 1"
                    options={fileOptions}
                  />
                </div>
                <div className={styles.fileType}>
                  <span className={styles.fileTypeType}>Type:</span> {nameMap[this.props.file1Type]}
                </div>
              </div>
              <div className={styles.flexRow}>
                <div className={styles.flexFill}>
                  <FileOpener
                    file={this.props.file2}
                    fileOpened={this.props.openFile2}
                    inputText="File 2"
                    options={fileOptions}
                  />
                </div>
                <div className={styles.fileType}>
                  <span className={styles.fileTypeType}>Type:</span> {nameMap[this.props.file2Type]}
                </div>
              </div>
            </div>
            <div className={`${styles.flexRow} ${styles.buttonWrapper}`}>
              <FlatButton
                label="Break"
                disabled={
                  this.props.file1Type !== this.props.file2Type ||
                  (this.props.file1Type !== 'sav' && this.props.file2Type !== 'bv')
                }
                onClick={this.break}
              />
            </div>
          </div>
        </Paper>
      </div>
    );
  }
}
