export default class SceneObject {
  private readonly type: string
  public image = {} as HTMLImageElement;

  constructor(type: string = "scene-object", image: HTMLImageElement) {
    this.type = type
    this.image = image;
  }

  public operation(uniqueState: any): void {
    const s = JSON.stringify(this.image);
    const u = JSON.stringify(uniqueState);
    console.log(`Flyweight: Displaying shared (${s}) and unique (${u}) state.`);
  }

  public getType() {
    return this.type
  }
}