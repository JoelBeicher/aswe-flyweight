import Vector from '../helper/Vector';
import SceneObject from '../flyweight-classes/SceneObject';


export default class Missile extends SceneObject {

  public static readonly type = "Missile";

  constructor(
    image: HTMLImageElement,
    subType: string
  ) {
    super( `${Missile.type}-${subType}`, image );
  }

}