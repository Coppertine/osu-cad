import {ViewportTool} from "@/editor/viewport/tools";
import {Vec2} from "@/util/math";
import {DragOperation} from "@/editor/viewport/tools/operation";
import {DragEvent} from "@/util/drag";
import {HitObject} from "@/editor/hitobject";
import {Slider} from "@/editor/hitobject/slider";
import {SliderControlPoint} from "@/editor/hitobject/sliderPath";
import {ClientOpCode} from "@common/opcodes";

function mod(a: number, n: number) {
    return ((a % n) + n) % n
}

export class RotateOperation extends DragOperation {

    private startAngle: number;
    private lastAngle: number;
    private totalAmount = 0;

    constructor(readonly tool: ViewportTool, readonly center: Vec2, readonly startPos: Vec2) {
        super();
        this.startAngle = center.angleTo(startPos)
        this.lastAngle = this.startAngle
        console.log('rotate')
    }

    createOverrides(hitObject: HitObject) {
        const position = hitObject.position
            .rotateAround(this.center, this.totalAmount)

        if (hitObject instanceof Slider) {
            const controlPoints = hitObject.path.controlPoints.value.map(it => new SliderControlPoint(
                it.position.rotateAround(this.center, this.totalAmount),
                it.kind
            ))
            return {position, controlPoints}
        }
        return {position}
    }

    onMouseMove(mousePos: Vec2): boolean {
        const angle = this.center.angleTo(mousePos)
        const diff = mod(angle - this.lastAngle + Math.PI, Math.PI * 2) - Math.PI
        this.totalAmount += diff

        this.tool.sendOperationCommands(
            this.tool.selection.map(it => {
                const overrides = this.createOverrides(it)

                it.applyOverrides(overrides, false)

                return [ClientOpCode.HitObjectOverride, {id: it.id, overrides}]
            })
        )

        this.lastAngle = angle

        return false;
    }



    commit(evt: DragEvent): void {
        console.log('finish rotate')
        this.tool.selection.map(it => {
            const serialized = it.serialized()
            const overrides = this.createOverrides(it)

            console.log({
                ...serialized,
                ...overrides
            })

            this.tool.sendMessage(ClientOpCode.UpdateHitObject, {
                ...serialized,
                ...overrides
            })
        })
    }


}