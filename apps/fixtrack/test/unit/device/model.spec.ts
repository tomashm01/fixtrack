import { DeviceModel } from '../../../../fixtrack/src/device/domain/model';

describe('DeviceModel', () => {
  it('debería crear una instancia válida de DeviceModel', () => {
    const validTypeName = 'Galaxy S22';
    const deviceModel = DeviceModel.with(validTypeName);

    expect(deviceModel).toBeDefined();
    expect(deviceModel.value).toBe(validTypeName);
  });

  it('debería lanzar un error si se proporciona un nombre de tipo vacío', () => {
    expect(() => {
      DeviceModel.with('');
    }).toThrow('MODELO NO PUEDE ESTAR VACÍO');
  });
});
