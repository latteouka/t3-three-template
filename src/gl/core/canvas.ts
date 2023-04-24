import * as THREE from "three";
import { MyDisplay } from "../core/myDisplay";
import { Rect } from "./rect";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export class Canvas extends MyDisplay {
  public cameraPers: THREE.PerspectiveCamera;
  public cameraOrth: THREE.OrthographicCamera;

  public renderer: THREE.WebGLRenderer;
  public mainScene: THREE.Scene;

  public isRender = true;
  public renderSize: Rect = new Rect();

  private _controls: OrbitControls;

  constructor(opt: { el: HTMLCanvasElement }) {
    super(opt);

    const renderParam = {
      canvas: this.el,
      antialias: true,
      preserveDrawingBuffer: true,
      premultipliedAlpha: true,
      powerPreference: "low-power",
      alpha: true,
    };

    // transparent

    this.renderer = new THREE.WebGLRenderer(renderParam);
    this.renderer.autoClear = true;
    this.renderer.setClearColor(0xffffff, 1);

    this.mainScene = new THREE.Scene();

    this.cameraPers = this._makePersCamera();
    this._updatePersCamera(this.cameraPers, 10, 10);

    this.cameraOrth = this._makeOrthCamera();
    this._updateOrthCamera(this.cameraOrth, 10, 10);

    // CONTROL
    this._controls = new OrbitControls(this.cameraPers, this.el);
    this._controls.enabled = false;
    this._controls.enablePan = false;
  }

  protected _makePersCamera(): THREE.PerspectiveCamera {
    return new THREE.PerspectiveCamera(60, 1, 0.0000001, 50000);
  }
  protected _makeOrthCamera(): THREE.OrthographicCamera {
    return new THREE.OrthographicCamera(1, 1, 1, 1);
  }

  protected _updatePersCamera(camera: THREE.PerspectiveCamera, w = 10, h = 10) {
    const perspective = 400;
    camera.fov = (180 * (2 * Math.atan(h / 2 / perspective))) / Math.PI;
    camera.aspect = w / h;
    camera.position.z = perspective;
    camera.updateProjectionMatrix();
  }

  protected _updateOrthCamera(
    camera: THREE.OrthographicCamera,
    w = 10,
    h = 10
  ) {
    camera.left = -w * 0.5;
    camera.right = w * 0.5;
    camera.top = h * 0.5;
    camera.bottom = -h * 0.5;
    // camera.near = -10000
    // camera.far = 100000
    camera.near = -10000;
    camera.far = 10000;
    camera.updateProjectionMatrix();
    camera.position.set(0, 0, 1000);
    // camera.lookAt(new Vector3(0, 0, 0))
  }

  protected _enableControl(enable: boolean) {
    this._controls.enabled = enable;
  }

  protected _update(): void {
    super._update();
  }
}
