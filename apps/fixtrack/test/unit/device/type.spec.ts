import { Type } from '../../../../../libs/contracts/src';
import { DeviceType } from '../../../../fixtrack/src/device/domain/model';

describe('DeviceType', () => {
  it('debería crear una instancia válida de DeviceType', () => {
    const validTypeName = 'PHONE';
    const deviceType = DeviceType.with(validTypeName);

    expect(deviceType).toBeDefined();
    expect(deviceType.value).toBe(validTypeName);
  });

  it('debería lanzar un error si se proporciona un nombre de tipo vacío', () => {
    expect(() => {
      DeviceType.with('');
    }).toThrow('TIPO NO PUEDE ESTAR VACÍO');
  });

  it('debería lanzar un error si se proporciona un nombre de tipo inválido', () => {
    const invalidTypeName = 'INVALID_TYPE_NAME';
    expect(() => {
      DeviceType.with(invalidTypeName);
    }).toThrow(
      `TIPO INVÁLIDO: ${invalidTypeName}. TIPOS VÁLIDOS: ${Object.values(
        Type
      ).join(', ')}`
    );
  });
});
