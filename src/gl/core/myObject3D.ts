import * as THREE from "three";
import { Update } from "./update";
import { Resize } from "./resize";
import type { VoidFunction } from "../type";

export class MyObject3D extends THREE.Object3D {
  private _updateHandler: VoidFunction;
  private _layoutHandler: VoidFunction;

  constructor() {
    super();

    this._updateHandler = this._update.bind(this);
    Update.instance.add(this._updateHandler);

    this._layoutHandler = this._resize.bind(this);
    Resize.instance.add(this._layoutHandler);
  }

  protected _update(): void {
    // for binding
  }

  protected _resize(): void {
    // for binding
  }
}
