import {NativeModules} from 'react-native';
import mockAsyncStorage from '@react-native-community/async-storage/jest/async-storage-mock';

// ---------------------------------------------------------------------------
// FICHIER POUR "MOCKER" THE IMAGE PICKER MANAGER EN CAS DE TESTS AUTOMATISES
// ----------------------------------------------------------------------------

jest.mock('@react-native-community/async-storage', () => mockAsyncStorage);
NativeModules.ImagePickerManager = {
  showImagePicker: jest.fn(),
  launchCamera: jest.fn(),
  launchImageLibrary: jest.fn(),
};