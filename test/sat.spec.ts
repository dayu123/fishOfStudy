import * as SAT from 'sat';
import { Test } from 'testBuilder';
import { angleToVector, vectorToAngle } from 'utils/mathUtils';

export const sat_test = new Test('sat', runner => {
    runner.describe('angleToVector', () => {
        const v1 = new SAT.Vector(1, 1).normalize();
        const angle = vectorToAngle(v1);
        const v2 = angleToVector(angle);
        console.log(v1, v2, v1.x === v2.x, v1.y === v2.y);
    });
});
