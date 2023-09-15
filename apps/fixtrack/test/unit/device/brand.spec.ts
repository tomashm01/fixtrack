import { Brand } from '../../../../../libs/contracts/src';
import { DeviceBrand } from '../../../../fixtrack/src/device/domain/model';

describe('DeviceBrand', () => {
  it('debería crear una instancia válida de DeviceBrand', () => {
    const validTypeName = 'SAMSUNG';
    const deviceBrand = DeviceBrand.with(validTypeName);

    expect(deviceBrand).toBeDefined();
    expect(deviceBrand.value).toBe(validTypeName);
  });

  it('debería lanzar un error si se proporciona un nombre de marca vacía', () => {
    expect(() => {
      DeviceBrand.with('');
    }).toThrow('MARCA NO PUEDE ESTAR VACÍA');
  });

  it('debería lanzar un error si se proporciona un nombre de marca inválida', () => {
    const invalidTypeName = 'INVALID_TYPE_NAME';
    expect(() => {
      DeviceBrand.with(invalidTypeName);
    }).toThrow(
      `MARCA INVÁLIDA: ${invalidTypeName}. MARCAS VÁLIDAS: ${Object.values(
        Brand
      ).join(', ')}`
    );
  });
});
