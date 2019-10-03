import React, { Component } from 'react';
import InputForm from '../components/InputForm';
import Draggable, { DraggableCore } from 'react-draggable';
import {
    calculateSPLat30m, calculateCorrectionForRoadGrad, calculateCorrectionForInterruptedTrafficFlow, calculateEqSourceHeight,
    calculateCorrDistAndHeight, calculateEffBarrierAtt, calculatePathLengthDiffFromEffBarrierAtt, isBreakingLOS, angleBetweenPoints,
    calculateFirstPointOfContact, calculateEffectiveBarrierPosition, extrapolateLine
} from '../utils'
import { strict } from 'assert';


let SCALE_Y = 50 / 900; //10 / 225;    // 225 pixels = 10 m
let SCALE_X = 50 / 900;
const SOURCE_HEIGHT_IN_PIXELS = 0.8 / SCALE_Y;
const BARRIER_HEIGHT_IN_PIXELS = 1.8 / SCALE_Y;
const RECEIVER_HEIGHT_IN_PIXELS = 1.5 / SCALE_Y;
const RECEIVER_LINE_BOUNDS_IN_PIXELS = 225;
let handleDragMidLineAnchorLeftX = 600;
let handleDragMidLineAnchorRightX = 900;
let RECEIVER_SYMBOL_ADJUSTMENT_FACTOR = 0;

class Graphics extends React.Component {
    state = {
        canvasProps: {
            canvasHeight: 700,
            canvasWidth: 1500
        },
        labelLeftLimitLine: {
            x1: 300,
            y1: 350,
            x2: 300,
            y2: 700
        },
        labelRightLimitLine: {
            x1: 1200,
            y1: 350,
            x2: 1200,
            y2: 700
        },
        sourceToReceiverDistanceLabelLine: {
            x1: 300,
            y1: 670,
            x2: 1200,
            y2: 670
        },
        sourceToBarrierLabelHorizontalLine: {
            x1: 300,
            y1: 610,
            x2: 750,
            y2: 610
        },
        receiverToBarrierLabelHorizontalLine: {
            x1: 750,
            y1: 610,
            x2: 1200,
            y2: 610
        },
        sourceHeightTextPosition: {
            x: 80,
            y: 330
        },
        sourceLinePosition: {
            x1: 300,
            y1: 350,
            x2: 600,
            y2: 350
        },
        sourceObject: {
            x1: 300,
            y1: 350,
            x2: 300,
            y2: 350 - SOURCE_HEIGHT_IN_PIXELS
        },
        midLinePosition: {
            x1: 600,
            y1: 350,
            x2: 900,
            y2: 350
        },
        midLineAnchorLeft: {
            xAnchor: 600,
            yAnchor: 350,
            radius: 6
        },
        midLineAnchorRight: {
            xAnchor: 900,
            yAnchor: 350,
            radius: 6
        },
        barrierPosition: {
            x1: 750,
            y1: 350,//- BARRIER_HEIGHT_IN_PIXELS,
            x2: 750,
            y2: 350 - BARRIER_HEIGHT_IN_PIXELS
            // xCalc: 850
        },
        receiverLinePosition: {
            x1: 900,
            y1: 350,
            x2: 1200,
            y2: 350
        },
        receiverSymbol: {
            xAnchor: 1200,
            yAnchor: 350 - RECEIVER_HEIGHT_IN_PIXELS,
            radius: 10
        },
        receiverSymbolPosition: {
            x: 0,
            y: 0
        },
        carPosition: {
            xCar: 200,
            yCar: 290
        },
        housePosition: {
            xHouse: 1240,
            yHouse: 290
        },
        receiverObject: {   // Receiver object
            x1: 1200,
            y1: 350,
            x2: 1200,
            y2: 350 - RECEIVER_HEIGHT_IN_PIXELS
        },
        sourceToInterceptLine: {
            x1: 300,
            y1: 350 - SOURCE_HEIGHT_IN_PIXELS,
            x2: 1200,
            y2: (350 - 50.4)
        },
        receiverToInterceptLine: {
            x1: 1200,
            y1: 350 - RECEIVER_HEIGHT_IN_PIXELS,
            x2: 300,
            y2: (350 - 37.8)
        },
        groundSurface: {
            x1: 0,
            y1: 350,
            x2: 600,
            y2: 350,
            x3: 900,
            y3: 350,
            x4: 1500,
            y4: 350,
            x5: 1500,
            y5: 700,
            x6: 0,
            y6: 700
        },
        barrierBoundLeft: 300,
        barrierBoundRight: 300,
        barrierObjectPositionDelta: 0,
        yReceiverCalc: 350,
        yReceiverObjectCalc: 350 - RECEIVER_HEIGHT_IN_PIXELS,
        inputValues:
        {
            roadSpeed: 50,
            groundSurface: "Soft",
            trafficVolume: 1000,
            percentageOfHeavyTruck: 2.5,
            roadWidth: 3.7,
            roadGradient: 0,
            distanceFromReceiverToIntersection: 151,
            horizontalDistanceFromSourceToReceiver: 50,
            targetSPL: 36,
            barrierHeight: 1.8,
            isBarrierChecked: false
        }

    };


    setStateInputsFromInputForm = (inputFormState, eventID) => {
        if (inputFormState.horizontalDistanceFromSourceToReceiver == "" || inputFormState.horizontalDistanceFromSourceToReceiver == 0) {
            return;
        }

        let sourceObject = this.state.sourceObject;
        let receiverObject = this.state.receiverObject;
        let sourceLinePosition = this.state.sourceLinePosition;
        let receiverLinePosition = this.state.receiverLinePosition;
        let barrierPosition = this.state.barrierPosition;

        if (eventID == "horizontalDistanceFromSourceToReceiver") {     // TO RE-SCALE SOURCE OBJECT, RECEIVER OBJECT AND BARRIER HEIGHTS 
            const sx = SCALE_X;
            const sy = SCALE_Y;

            // Adjust Scale
            SCALE_X = parseFloat(inputFormState.horizontalDistanceFromSourceToReceiver) / (this.state.receiverObject.x1 - this.state.sourceObject.x1);
            SCALE_Y = SCALE_X;
            console.log("SCX", SCALE_X, inputFormState.horizontalDistanceFromSourceToReceiver);
            const currentBarrierHeight = (this.state.barrierPosition.y1 - this.state.barrierPosition.y2) * sy;
            const currentReceiverHeight = (this.state.receiverObject.y1 - this.state.receiverObject.y2) * sy;
            const currentSourceHeight = (this.state.sourceObject.y1 - this.state.sourceObject.y2) * sy;
            console.log("cbh", currentBarrierHeight);
            console.log("crh", currentReceiverHeight);

            console.log("height", (inputFormState.barrierHeight), this.state.barrierPosition.y1, SCALE_Y, sy, this.state.barrierPosition.y1 - (currentBarrierHeight) / SCALE_Y);

            sourceObject = {
                x1: this.state.sourceObject.x1,
                y1: this.state.sourceObject.y1,
                x2: this.state.sourceObject.x2,
                y2: this.state.sourceObject.y1 - (currentSourceHeight / SCALE_Y)
            };

            receiverObject = {   // Receiver object
                x1: this.state.receiverObject.x1,
                y1: this.state.receiverObject.y1,
                x2: this.state.receiverObject.x2,
                y2: this.state.receiverObject.y1 - (currentReceiverHeight / SCALE_Y)
            };
            barrierPosition = {
                x1: this.state.barrierPosition.x1,
                y1: this.state.barrierPosition.y1,
                x2: this.state.barrierPosition.x2,
                y2: this.state.barrierPosition.y1 - (currentBarrierHeight / SCALE_Y)
            }
            
            this.setState({
                sourceObject: sourceObject,
                receiverSymbol: {
                    xAnchor: this.state.receiverSymbol.xAnchor,
                    yAnchor: this.state.receiverObject.y1 - (currentReceiverHeight / SCALE_Y),
                    radius: this.state.receiverSymbol.radius
                },
                receiverObject: receiverObject,
                barrierPosition: barrierPosition
            });
        } else if (eventID == "roadSpeed" || eventID == "percentageOfHeavyTruck") {     // TO UPDATE SOURCE OBJECT HEIGHT
            const s = calculateEqSourceHeight(parseInt(inputFormState.roadSpeed), parseFloat(inputFormState.percentageOfHeavyTruck));
            sourceObject = {
                x1: this.state.sourceObject.x1,
                y1: this.state.sourceObject.y1,
                x2: this.state.sourceObject.x2,
                y2: this.state.sourceObject.y1 - (s / SCALE_Y)
            };
            this.setState({
                sourceObject: sourceObject 
            });

        } else {
            const currentBarrierHeight = Math.abs((this.state.barrierPosition.y1 - this.state.barrierPosition.y2) * SCALE_Y);
            barrierPosition = {
                x1: this.state.barrierPosition.x1,
                y1: this.state.barrierPosition.y1,
                x2: this.state.barrierPosition.x2,
                y2: (inputFormState.isBarrierChecked && (currentBarrierHeight != inputFormState.barrierHeight)) ? (this.state.barrierPosition.y1 - (inputFormState.barrierHeight) / SCALE_Y) : this.state.barrierPosition.y2
            };
            const p = calculateFirstPointOfContact(sourceObject, "source", sourceLinePosition, receiverLinePosition, barrierPosition);
            // console.log(p.decision);
            const q = calculateFirstPointOfContact(receiverObject, "receiver", sourceLinePosition, receiverLinePosition, barrierPosition);
            // console.log(q.decision);

            this.setState({
                barrierPosition: barrierPosition,
                sourceToInterceptLine: {
                    x1: this.state.sourceToInterceptLine.x1,
                    y1: sourceObject.y2,
                    x2: this.state.sourceToInterceptLine.x2,
                    y2: extrapolateLine(this.state.sourceToInterceptLine.x1, sourceObject.y2, p.x, p.y, this.state.sourceToInterceptLine.x2)
                },
                receiverToInterceptLine: {
                    x1: this.state.receiverToInterceptLine.x1,
                    y1: receiverObject.y2,
                    x2: this.state.receiverToInterceptLine.x2,
                    y2: extrapolateLine(this.state.receiverToInterceptLine.x1, receiverObject.y2, q.x, q.y, this.state.receiverToInterceptLine.x2)
                }
            });
        }

        this.forceUpdate();
        let res;

        if (eventID != "isBarrierChecked") {
            res = this.runBarrierCalc(inputFormState, sourceObject, receiverObject, sourceLinePosition, receiverLinePosition, barrierPosition);
        } else {
            res = { inputValues: inputFormState };
        }
        this.setState(res);
    };


    calculateSPLWithBarrier(roadSpeed, groundSurface, trafficVolume, percentageOfHeavyTruck, roadWidth, roadGradient, distanceFromReceiverToIntersection, horizontalDistanceFromSourceToReceiver, barrierHeight,
        sourceObject, receiverObject, sourceLinePosition, receiverLinePosition, barrierPosition, calcSPL) {

        horizontalDistanceFromSourceToReceiver = parseFloat(horizontalDistanceFromSourceToReceiver);
        SCALE_X = horizontalDistanceFromSourceToReceiver / (receiverObject.x1 - sourceObject.x1);  // "horizontalDistanceFromSourceToReceiver" m = (x_receiver - x_source) pixels
        SCALE_Y = SCALE_X;

        // STEP 2
        const cal_SPLat30m = calculateSPLat30m(parseFloat(roadSpeed), parseInt(trafficVolume), parseFloat(percentageOfHeavyTruck));
        // console.log("SPL at 30 m",cal_SPLat30m);

        // const cal_IsOneRoad = roadWidth<hDistanceSourceToReceiver?true:false;

        // STEP 3
        const cal_correctionRoadGradient = calculateCorrectionForRoadGrad(parseFloat(percentageOfHeavyTruck), parseFloat(roadGradient));
        // console.log("correctionRoadGradient",cal_correctionRoadGradient);

        // STEP 4
        const cal_correctionInterruptedTrafficFlow = calculateCorrectionForInterruptedTrafficFlow(parseFloat(distanceFromReceiverToIntersection));
        // console.log(distanceFromReceiverToIntersection, cal_correctionInterruptedTrafficFlow);

        // STEP 5
        const s = calculateEqSourceHeight(parseInt(roadSpeed), parseFloat(percentageOfHeavyTruck));  // in meter
        // console.log("s",s);

        // STEP 6
        const r = (receiverObject.y1 - receiverObject.y2) * SCALE_Y;  // in meter
        let t = 0;
        let p = 0;
        let cal_effectiveTotalHeight = 0;

        // Adjusting y2
        const tempBarrierY2 = barrierPosition.y1 - (barrierHeight / SCALE_Y);
        console.log("Barrier Height Temp:", barrierPosition.y1, barrierHeight, tempBarrierY2);
        if ((tempBarrierY2 < sourceLinePosition.y2) && (tempBarrierY2 < receiverObject.y1)) {
            t = Math.abs((sourceLinePosition.y2 - tempBarrierY2) * SCALE_Y);
            p = Math.abs((receiverObject.y1 - tempBarrierY2) * SCALE_Y);
            console.log(s, r, t, p);
            cal_effectiveTotalHeight = s + r + t + p;
        } else {
            cal_effectiveTotalHeight = s + r + Math.abs((sourceLinePosition.y1 - receiverObject.y1) * SCALE_Y);
            console.log(s, r, t, p);
        }
        console.log("effectiveTotalHeight", cal_effectiveTotalHeight);

        const isGroundSurfaceSoft = groundSurface == "Soft" ? true : false;
        // console.log(isGroundSurfaceSoft);
        const cal_correctionDistanceAndHeight = calculateCorrDistAndHeight(isGroundSurfaceSoft, cal_effectiveTotalHeight, horizontalDistanceFromSourceToReceiver);
        console.log("correction for distance and height", isGroundSurfaceSoft, horizontalDistanceFromSourceToReceiver, cal_correctionDistanceAndHeight);

        // STEP 7
        const barrierPositionTemp = {
            x1: barrierPosition.x1,
            y1: barrierPosition.y1,
            x2: barrierPosition.x2,
            y2: tempBarrierY2
        };
        const sourceLineBreakingLOS = isBreakingLOS(sourceObject, receiverObject, sourceLinePosition);
        const receiverLineBreakingLOS = isBreakingLOS(sourceObject, receiverObject, receiverLinePosition);
        let barrierLineBreakingLOS;
        let barrierInterruptsLOS;
        let effectiveBarrierPosition



        if (calcSPL) {
            barrierLineBreakingLOS = isBreakingLOS(sourceObject, receiverObject, barrierPosition);
            barrierInterruptsLOS = (sourceLineBreakingLOS == "true" || receiverLineBreakingLOS == "true" || barrierLineBreakingLOS == "true");
            console.log("LOS", barrierInterruptsLOS);
            effectiveBarrierPosition = calculateEffectiveBarrierPosition(sourceObject, receiverObject, sourceLinePosition, receiverLinePosition, barrierPosition);
            console.log(effectiveBarrierPosition);
        } else {
            barrierLineBreakingLOS = isBreakingLOS(sourceObject, receiverObject, barrierPositionTemp);
            barrierInterruptsLOS = (sourceLineBreakingLOS == "true" || receiverLineBreakingLOS == "true" || barrierLineBreakingLOS == "true");
            console.log("LOS", barrierInterruptsLOS);
            effectiveBarrierPosition = calculateEffectiveBarrierPosition(sourceObject, receiverObject, sourceLinePosition, receiverLinePosition, barrierPositionTemp);
            console.log(effectiveBarrierPosition);
        }

        const distSourceToBarrier = (effectiveBarrierPosition.x - sourceObject.x1) * SCALE_X;

        const a = Math.sqrt(((sourceObject.y2 - effectiveBarrierPosition.y) * SCALE_Y) ** 2 + (distSourceToBarrier) ** 2);
        const b = Math.sqrt(((receiverObject.y2 - effectiveBarrierPosition.y) * SCALE_Y) ** 2 + (horizontalDistanceFromSourceToReceiver - distSourceToBarrier) ** 2);
        const c = Math.sqrt(((receiverObject.y2 - sourceObject.y2) * SCALE_Y) ** 2 + (horizontalDistanceFromSourceToReceiver) ** 2);
        const pathLengthDifference = a + b - c;
        // console.log(pathLengthDifference);

        const cal_EffBarrierAtt = calculateEffBarrierAtt(barrierInterruptsLOS, pathLengthDifference, 100); // w is forcefully set to 100 to make the barrier of infinite length
        console.log("Barrier Attenuation:", cal_EffBarrierAtt);

        const cal_SPLwithBarrier = cal_SPLat30m + cal_correctionRoadGradient + cal_correctionInterruptedTrafficFlow + cal_correctionDistanceAndHeight - cal_EffBarrierAtt;

        return cal_SPLwithBarrier;
    }


    runBarrierCalc = (tempState, sourceObject, receiverObject, sourceLinePosition, receiverLinePosition, barrierPosition) => {
        let { roadSpeed, groundSurface, trafficVolume, percentageOfHeavyTruck, roadWidth, roadGradient, distanceFromReceiverToIntersection, horizontalDistanceFromSourceToReceiver, targetSPL, barrierHeight, isBarrierChecked } = tempState;
        console.log("horizontal distance in runBarrierCalc", tempState.targetSPL);
        if (isBarrierChecked == true) {
            const cal_SPLwithBarrier = this.calculateSPLWithBarrier(roadSpeed, groundSurface, trafficVolume, percentageOfHeavyTruck, roadWidth, roadGradient, distanceFromReceiverToIntersection, horizontalDistanceFromSourceToReceiver,
                barrierHeight, sourceObject, receiverObject, sourceLinePosition, receiverLinePosition, barrierPosition, true);

            return ({
                inputValues: {
                    roadSpeed,
                    groundSurface,
                    trafficVolume,
                    percentageOfHeavyTruck,
                    roadWidth,
                    roadGradient,
                    distanceFromReceiverToIntersection,
                    horizontalDistanceFromSourceToReceiver,
                    targetSPL: cal_SPLwithBarrier,
                    barrierHeight,
                    isBarrierChecked
                }
            });
        } else {
            let barrierHeightTemp = 0.6;
            let cal_SPLwithBarrierTemp;
            let noIteration = 0;
            let error = Infinity;
            while (barrierHeightTemp <= 20.0 && noIteration < 1000 && error > 0.1) {
                cal_SPLwithBarrierTemp = this.calculateSPLWithBarrier(roadSpeed, groundSurface, trafficVolume, percentageOfHeavyTruck, roadWidth, roadGradient, distanceFromReceiverToIntersection, horizontalDistanceFromSourceToReceiver,
                    barrierHeightTemp, sourceObject, receiverObject, sourceLinePosition, receiverLinePosition, barrierPosition, false);
                console.log("cal_SPLwithBarrierTemp", cal_SPLwithBarrierTemp);
                error = cal_SPLwithBarrierTemp - parseFloat(targetSPL);
                noIteration++;
                barrierHeightTemp = barrierHeightTemp + 0.1;
            }
            barrierHeightTemp = barrierHeightTemp - 0.1;
            console.log("ENDDDDDDDDDDDDDD:", barrierHeightTemp, noIteration, error);

            const barrierPositionTemp = {
                x1: barrierPosition.x1,
                y1: barrierPosition.y1,
                x2: barrierPosition.x2,
                y2: barrierPosition.y1 - (barrierHeightTemp / SCALE_Y)
            };

            const p = calculateFirstPointOfContact(sourceObject, "source", sourceLinePosition, receiverLinePosition, barrierPositionTemp);
            // console.log(p.decision);
            const q = calculateFirstPointOfContact(receiverObject, "receiver", sourceLinePosition, receiverLinePosition, barrierPositionTemp);
            // console.log(q.decision);

            return ({
                barrierPosition: {
                    x1: this.state.barrierPosition.x1,
                    y1: this.state.barrierPosition.y1,
                    x2: this.state.barrierPosition.x2,
                    y2: this.state.barrierPosition.y1 - (barrierHeightTemp / SCALE_Y)
                },
                sourceToInterceptLine: {
                    x1: this.state.sourceToInterceptLine.x1,
                    y1: sourceObject.y2,
                    x2: this.state.sourceToInterceptLine.x2,
                    y2: extrapolateLine(this.state.sourceToInterceptLine.x1, sourceObject.y2, p.x, p.y, this.state.sourceToInterceptLine.x2)
                },
                receiverToInterceptLine: {
                    x1: this.state.receiverToInterceptLine.x1,
                    y1: receiverObject.y2,
                    x2: this.state.receiverToInterceptLine.x2,
                    y2: extrapolateLine(this.state.receiverToInterceptLine.x1, receiverObject.y2, q.x, q.y, this.state.receiverToInterceptLine.x2)
                },
                inputValues: {
                    roadSpeed,
                    groundSurface,
                    trafficVolume,
                    percentageOfHeavyTruck,
                    roadWidth,
                    roadGradient,
                    distanceFromReceiverToIntersection,
                    horizontalDistanceFromSourceToReceiver,
                    targetSPL,
                    barrierHeight: barrierHeightTemp.toFixed(1),
                    isBarrierChecked
                }
            });
        }
    };


    handleDrag = (e, ui) => {
        const { x1, y1, x2, y2 } = this.state.midLinePosition;
        const { x1: x1Barrier, y1: y1Barrier, x2: x2Barrier, y2: y2Barrier } = this.state.barrierPosition;
        const { x1: x1R, y1: y1R, x2: x2R, y2: y2R } = this.state.receiverLinePosition;
        const { x1: x1ReceiverObject, y1: y1ReceiverObject, x2: x2ReceiverObject, y2: y2ReceiverObject } = this.state.receiverObject;
        const { xHouse, yHouse } = this.state.housePosition;
        const { xAnchor, yAnchor, radius } = this.state.receiverSymbol;
        const bb = Math.abs(y1Barrier - y2Barrier);

        let y1_New = (y1 +
            ((x1Barrier - x1) * ((y2 + ui.deltaY - y1)) / (x2 - x1)));

        const receiverObject = {
            x1: x1ReceiverObject,
            y1: y1ReceiverObject + ui.deltaY,
            x2: x2ReceiverObject,
            y2: y2ReceiverObject + ui.deltaY
        };

        let barrierPosition;
        if (x1Barrier <= x1) {
            barrierPosition = {
                x1: x1Barrier,
                y1: y1,
                x2: x2Barrier,
                y2: y1 - bb
            };
        } else if (x1Barrier >= x2) {
            barrierPosition = {
                x1: x1Barrier,
                y1: y2 + ui.deltaY,
                x2: x2Barrier,
                y2: y2 + ui.deltaY - bb
            };
        } else {
            barrierPosition = {
                x1: x1Barrier,
                y1: y1_New,
                x2: x2Barrier,
                y2: y1_New - bb
            };
        }
        const receiverLinePosition = {
            x1: this.state.receiverLinePosition.x1,
            y1: y1ReceiverObject + ui.deltaY,
            x2: this.state.receiverLinePosition.x2,
            y2: y1ReceiverObject + ui.deltaY
        };
        const p = calculateFirstPointOfContact(this.state.sourceObject, "source", this.state.sourceLinePosition, receiverLinePosition, barrierPosition);
        // console.log(p.decision);
        const q = calculateFirstPointOfContact(receiverObject, "receiver", this.state.sourceLinePosition, receiverLinePosition, barrierPosition);
        // console.log(q.decision);
        this.setState({
            groundSurface: {
                x1: this.state.groundSurface.x1,
                y1: this.state.groundSurface.y1,
                x2: this.state.groundSurface.x2,
                y2: this.state.groundSurface.y2,
                x3: this.state.groundSurface.x3,
                y3: this.state.groundSurface.y3 + ui.deltaY,
                x4: this.state.groundSurface.x4,
                y4: this.state.groundSurface.y4 + ui.deltaY,
                x5: this.state.groundSurface.x5,
                y5: this.state.groundSurface.y5,
                x6: this.state.groundSurface.x6,
                y6: this.state.groundSurface.y6
            },
            labelRightLimitLine: {
                x1: this.state.labelRightLimitLine.x1,
                y1: this.state.labelRightLimitLine.y1 + ui.deltaY,
                x2: this.state.labelRightLimitLine.x2,
                y2: this.state.labelRightLimitLine.y2
            },
            midLinePosition: {
                x1: x1,
                y1: y1,
                x2: x2,
                y2: y2 + ui.deltaY
            },
            midLineAnchorRight: {
                xAnchor: this.state.midLineAnchorRight.xAnchor,
                yAnchor: this.state.midLineAnchorRight.yAnchor + ui.deltaY,
                radius: this.state.midLineAnchorRight.radius
            },
            yReceiverCalc: y1R + ui.deltaY,
            yReceiverObjectCalc: y2ReceiverObject + ui.deltaY,
            receiverObject,
            housePosition: {
                xHouse,
                yHouse: yHouse + ui.deltaY
            },
            receiverSymbol: {
                xAnchor,
                yAnchor: yAnchor + ui.deltaY,
                radius
            },
            barrierPosition,
            sourceToInterceptLine: {
                x1: this.state.sourceToInterceptLine.x1,
                y1: this.state.sourceToInterceptLine.y1,
                x2: this.state.sourceToInterceptLine.x2,
                y2: extrapolateLine(this.state.sourceToInterceptLine.x1, this.state.sourceToInterceptLine.y1, p.x, p.y, this.state.sourceToInterceptLine.x2)
            },
            receiverToInterceptLine: {
                x1: this.state.receiverToInterceptLine.x1,
                y1: this.state.receiverToInterceptLine.y1 + ui.deltaY,
                x2: this.state.receiverToInterceptLine.x2,
                y2: extrapolateLine(this.state.receiverToInterceptLine.x1, this.state.receiverToInterceptLine.y1 + ui.deltaY, q.x, q.y, this.state.receiverToInterceptLine.x2)
            }
        });

    }

    // handleDragOnStart = (e, ui) => {
    //     yReceiverCalc = this.state.receiverObject.y1;
    //     console.log(yReceiverCalc);
    // }

    handleDragOnStop = (e, ui) => {
        const receiverLinePosition = {
            x1: this.state.receiverLinePosition.x1,
            y1: this.state.receiverLinePosition.y1 + ui.y,
            x2: this.state.receiverLinePosition.x2,
            y2: this.state.receiverLinePosition.y2 + ui.y
        };
        this.setState({
            receiverLinePosition
        });

        const res = this.runBarrierCalc(this.state.inputValues, this.state.sourceObject, this.state.receiverObject, this.state.sourceLinePosition, receiverLinePosition, this.state.barrierPosition);
        this.setState(res);
    }

    handleDragReceiverSymbol = (e, ui) => {
        const { x1: x1ReceiverObject, y1: y1ReceiverObject, x2: x2ReceiverObject, y2: y2ReceiverObject } = this.state.receiverObject;
        const receiverObject = {
            x1: x1ReceiverObject,
            y1: y1ReceiverObject,
            x2: x2ReceiverObject,
            y2: y2ReceiverObject + ui.deltaY
        };

        const q = calculateFirstPointOfContact(receiverObject, "receiver", this.state.sourceLinePosition, this.state.receiverLinePosition, this.state.barrierPosition);
        // console.log(q.decision); 
        this.setState({
            receiverObject,
            receiverToInterceptLine: {
                x1: this.state.receiverToInterceptLine.x1,
                y1: receiverObject.y2,
                x2: this.state.receiverToInterceptLine.x2,
                y2: extrapolateLine(this.state.receiverToInterceptLine.x1, receiverObject.y2, q.x, q.y, this.state.receiverToInterceptLine.x2)
            },
            yReceiverObjectCalc: this.state.yReceiverObjectCalc + ui.deltaY
        });
    }

    // handleDragReceiverSymbolOnStart = (e, ui) => {
    //     yReceiverObjectCalc = this.state.receiverObject.y2;
    //     // console.log(yReceiverObjectCalc);
    // }

    handleDragReceiverSymbolOnStop = (e, ui) => {
        // yReceiverObjectCalc = yReceiverObjectCalc + ui.y;
        RECEIVER_SYMBOL_ADJUSTMENT_FACTOR = ui.y;
        this.setState({
            receiverSymbol: {
                xAnchor: this.state.receiverSymbol.xAnchor,
                yAnchor: this.state.receiverSymbol.yAnchor + ui.y,
                radius: this.state.receiverSymbol.radius
            },
            receiverSymbolPosition: {
                x: 0,
                y: 0
            }
        });

        const res = this.runBarrierCalc(this.state.inputValues, this.state.sourceObject, this.state.receiverObject, this.state.sourceLinePosition, this.state.receiverLinePosition, this.state.barrierPosition);
        this.setState(res);
    }

    handleDragBarrier = (e, ui) => {
        const { x1: x1Barrier, y1: y1Barrier, x2: x2Barrier, y2: y2Barrier } = this.state.barrierPosition;
        const { x1, y1, x2, y2 } = this.state.midLinePosition;
        const bb = Math.abs(y2Barrier - y1Barrier);

        let y1_New = (y1 +
            ((x1Barrier + ui.x - x1) * ((y2 - y1)) / (x2 - x1)));

        // let trackX = x1Barrier + ui.x;
        let barrierPosition;
        let barrierPositionForLine;

        if (x1Barrier + ui.x >= x2) {
            barrierPosition = {
                x1: x1Barrier,
                y1: y2,
                x2: x1Barrier,
                y2: y2 - bb
            };
            barrierPositionForLine = {
                x1: x1Barrier + ui.x,
                y1: y2,
                x2: x1Barrier + ui.x,
                y2: y2 - bb
            };
        } else if (x1Barrier + ui.x <= x1) {
            barrierPosition = {
                x1: x1Barrier,
                y1: y1,
                x2: x1Barrier,
                y2: y1 - bb
            };
            barrierPositionForLine = {
                x1: x1Barrier + ui.x,
                y1: y1,
                x2: x1Barrier + ui.x,
                y2: y1 - bb
            };
        } else {
            barrierPosition = {
                x1: x1Barrier,
                y1: y1 == y2 ? y1Barrier : y1_New,
                x2: x1Barrier,
                y2: y1 == y2 ? y2Barrier : y1_New - bb
            };
            barrierPositionForLine = {
                x1: x1Barrier + ui.x,
                y1: y1 == y2 ? y1Barrier : y1_New,
                x2: x1Barrier + ui.x,
                y2: y1 == y2 ? y2Barrier : y1_New - bb
            };
        }

        const p = calculateFirstPointOfContact(this.state.sourceObject, "source", this.state.sourceLinePosition, this.state.receiverLinePosition, barrierPositionForLine);
        // console.log(p.decision);
        const q = calculateFirstPointOfContact(this.state.receiverObject, "receiver", this.state.sourceLinePosition, this.state.receiverLinePosition, barrierPositionForLine);
        // console.log(q.decision);

        this.setState(
            {
                sourceToBarrierLabelHorizontalLine: {
                    x1: this.state.sourceToBarrierLabelHorizontalLine.x1,
                    y1: this.state.sourceToBarrierLabelHorizontalLine.y1,
                    x2: this.state.sourceToBarrierLabelHorizontalLine.x2 + ui.deltaX,
                    y2: this.state.sourceToBarrierLabelHorizontalLine.y2
                },
                receiverToBarrierLabelHorizontalLine: {
                    x1: this.state.receiverToBarrierLabelHorizontalLine.x1 + ui.deltaX,
                    y1: this.state.receiverToBarrierLabelHorizontalLine.y1,
                    x2: this.state.receiverToBarrierLabelHorizontalLine.x2,
                    y2: this.state.receiverToBarrierLabelHorizontalLine.y2
                },
                barrierObjectPositionDelta: ui.x,
                barrierPosition,
                sourceToInterceptLine: {
                    x1: this.state.sourceToInterceptLine.x1,
                    y1: this.state.sourceToInterceptLine.y1,
                    x2: this.state.sourceToInterceptLine.x2,
                    y2: extrapolateLine(this.state.sourceToInterceptLine.x1, this.state.sourceToInterceptLine.y1, p.x, p.y, this.state.sourceToInterceptLine.x2)
                },
                receiverToInterceptLine: {
                    x1: this.state.receiverToInterceptLine.x1,
                    y1: this.state.receiverToInterceptLine.y1,
                    x2: this.state.receiverToInterceptLine.x2,
                    y2: extrapolateLine(this.state.receiverToInterceptLine.x1, this.state.receiverToInterceptLine.y1, q.x, q.y, this.state.receiverToInterceptLine.x2)
                }
            });

    }

    handleDragBarrierOnStop = (e, ui) => {
        const barrierPosition = {
            x1: this.state.barrierPosition.x1 + ui.x,
            y1: this.state.barrierPosition.y1,
            x2: this.state.barrierPosition.x2 + ui.x,
            y2: this.state.barrierPosition.y2
        };

        this.setState({
            barrierPosition,
            barrierObjectPositionDelta: 0
        });

        const res = this.runBarrierCalc(this.state.inputValues, this.state.sourceObject, this.state.receiverObject, this.state.sourceLinePosition, this.state.receiverLinePosition, barrierPosition);
        this.setState(res);

    }


    handleDragMidLineAnchorLeft = (e, ui) => {
        const sourceLinePosition = {
            x1: this.state.sourceLinePosition.x1,
            y1: this.state.sourceLinePosition.y1,
            x2: this.state.sourceLinePosition.x2 + ui.deltaX,
            y2: this.state.sourceLinePosition.y2
        };

        const bb = Math.abs(this.state.barrierPosition.y1 - this.state.barrierPosition.y2);

        let y1_New = (this.state.midLinePosition.y1 +
            ((this.state.barrierPosition.x1 - this.state.midLinePosition.x1 - ui.deltaX) * ((this.state.midLinePosition.y2 - this.state.midLinePosition.y1)) / (this.state.midLinePosition.x2 - this.state.midLinePosition.x1 - ui.deltaX)));

        let barrierPosition;

        if (this.state.barrierPosition.x1 >= this.state.midLinePosition.x2) {
            barrierPosition = {
                x1: this.state.barrierPosition.x1,
                y1: this.state.midLinePosition.y2,
                x2: this.state.barrierPosition.x2,
                y2: this.state.midLinePosition.y2 - bb
            };
        } else if (this.state.barrierPosition.x1 <= this.state.midLinePosition.x1) {
            barrierPosition = {
                x1: this.state.barrierPosition.x1,
                y1: this.state.midLinePosition.y1,
                x2: this.state.barrierPosition.x2,
                y2: this.state.midLinePosition.y1 - bb
            };
        } else {
            barrierPosition = {
                x1: this.state.barrierPosition.x1,
                y1: this.state.midLinePosition.y1 == this.state.midLinePosition.y2 ? this.state.barrierPosition.y1 : y1_New,
                x2: this.state.barrierPosition.x2,
                y2: this.state.midLinePosition.y1 == this.state.midLinePosition.y2 ? this.state.barrierPosition.y2 : y1_New - bb
            };
        }

        const p = calculateFirstPointOfContact(this.state.sourceObject, "source", sourceLinePosition, this.state.receiverLinePosition, barrierPosition);
        // console.log(p.decision);
        const q = calculateFirstPointOfContact(this.state.receiverObject, "receiver", sourceLinePosition, this.state.receiverLinePosition, barrierPosition);
        // console.log(q.decision);

        this.setState({
            groundSurface: {
                x1: this.state.groundSurface.x1,
                y1: this.state.groundSurface.y1,
                x2: this.state.groundSurface.x2 + ui.deltaX,
                y2: this.state.groundSurface.y2,
                x3: this.state.groundSurface.x3,
                y3: this.state.groundSurface.y3,
                x4: this.state.groundSurface.x4,
                y4: this.state.groundSurface.y4,
                x5: this.state.groundSurface.x5,
                y5: this.state.groundSurface.y5,
                x6: this.state.groundSurface.x6,
                y6: this.state.groundSurface.y6
            },
            sourceLinePosition,
            midLinePosition: {
                x1: this.state.midLinePosition.x1 + ui.deltaX,
                y1: this.state.midLinePosition.y1,
                x2: this.state.midLinePosition.x2,
                y2: this.state.midLinePosition.y2
            },
            barrierPosition,
            sourceToInterceptLine: {
                x1: this.state.sourceToInterceptLine.x1,
                y1: this.state.sourceToInterceptLine.y1,
                x2: this.state.sourceToInterceptLine.x2,
                y2: extrapolateLine(this.state.sourceToInterceptLine.x1, this.state.sourceToInterceptLine.y1, p.x, p.y, this.state.sourceToInterceptLine.x2)
            },
            receiverToInterceptLine: {
                x1: this.state.receiverToInterceptLine.x1,
                y1: this.state.receiverToInterceptLine.y1,
                x2: this.state.receiverToInterceptLine.x2,
                y2: extrapolateLine(this.state.receiverToInterceptLine.x1, this.state.receiverToInterceptLine.y1, q.x, q.y, this.state.receiverToInterceptLine.x2)
            }
        });

    }
    handleDragMidLineAnchorLeftOnStart = (e, ui) => {
        handleDragMidLineAnchorLeftX = this.state.midLineAnchorLeft.xAnchor;
    }
    handleDragMidLineAnchorLeftOnStop = (e, ui) => {
        handleDragMidLineAnchorLeftX = handleDragMidLineAnchorLeftX + ui.x;
        
        const res = this.runBarrierCalc(this.state.inputValues, this.state.sourceObject, this.state.receiverObject, this.state.sourceLinePosition, this.state.receiverLinePosition, this.state.barrierPosition);
        this.setState(res);
    }

    handleDragMidLineAnchorRight = (e, ui) => {
        const receiverLinePosition = {
            x1: this.state.receiverLinePosition.x1 + ui.deltaX,
            y1: this.state.receiverLinePosition.y1,
            x2: this.state.receiverLinePosition.x2,
            y2: this.state.receiverLinePosition.y2
        };

        const bb = Math.abs(this.state.barrierPosition.y1 - this.state.barrierPosition.y2);

        let y1_New = (this.state.midLinePosition.y1 +
            ((this.state.barrierPosition.x1 - this.state.midLinePosition.x1) * ((this.state.midLinePosition.y2 - this.state.midLinePosition.y1)) / (this.state.midLinePosition.x2 + ui.deltaX - this.state.midLinePosition.x1)));

        let barrierPosition;

        if (this.state.barrierPosition.x1 >= this.state.midLinePosition.x2) {
            barrierPosition = {
                x1: this.state.barrierPosition.x1,
                y1: this.state.midLinePosition.y2,
                x2: this.state.barrierPosition.x2,
                y2: this.state.midLinePosition.y2 - bb
            };
        } else if (this.state.barrierPosition.x1 <= this.state.midLinePosition.x1) {
            barrierPosition = {
                x1: this.state.barrierPosition.x1,
                y1: this.state.midLinePosition.y1,
                x2: this.state.barrierPosition.x2,
                y2: this.state.midLinePosition.y1 - bb
            };
        } else {
            barrierPosition = {
                x1: this.state.barrierPosition.x1,
                y1: this.state.midLinePosition.y1 == this.state.midLinePosition.y2 ? this.state.barrierPosition.y1 : y1_New,
                x2: this.state.barrierPosition.x2,
                y2: this.state.midLinePosition.y1 == this.state.midLinePosition.y2 ? this.state.barrierPosition.y2 : y1_New - bb
            };
        }

        const p = calculateFirstPointOfContact(this.state.sourceObject, "source", this.state.sourceLinePosition, receiverLinePosition, barrierPosition);
        // console.log(p.decision);
        const q = calculateFirstPointOfContact(this.state.receiverObject, "receiver", this.state.sourceLinePosition, receiverLinePosition, barrierPosition);
        // console.log(q.decision);

        this.setState({
            groundSurface: {
                x1: this.state.groundSurface.x1,
                y1: this.state.groundSurface.y1,
                x2: this.state.groundSurface.x2,
                y2: this.state.groundSurface.y2,
                x3: this.state.groundSurface.x3 + ui.deltaX,
                y3: this.state.groundSurface.y3,
                x4: this.state.groundSurface.x4,
                y4: this.state.groundSurface.y4,
                x5: this.state.groundSurface.x5,
                y5: this.state.groundSurface.y5,
                x6: this.state.groundSurface.x6,
                y6: this.state.groundSurface.y6
            },
            midLinePosition: {
                x1: this.state.midLinePosition.x1,
                y1: this.state.midLinePosition.y1,
                x2: this.state.midLinePosition.x2 + ui.deltaX,
                y2: this.state.midLinePosition.y2
            },
            receiverLinePosition,
            barrierPosition,
            sourceToInterceptLine: {
                x1: this.state.sourceToInterceptLine.x1,
                y1: this.state.sourceToInterceptLine.y1,
                x2: this.state.sourceToInterceptLine.x2,
                y2: extrapolateLine(this.state.sourceToInterceptLine.x1, this.state.sourceToInterceptLine.y1, p.x, p.y, this.state.sourceToInterceptLine.x2)
            },
            receiverToInterceptLine: {
                x1: this.state.receiverToInterceptLine.x1,
                y1: this.state.receiverToInterceptLine.y1,
                x2: this.state.receiverToInterceptLine.x2,
                y2: extrapolateLine(this.state.receiverToInterceptLine.x1, this.state.receiverToInterceptLine.y1, q.x, q.y, this.state.receiverToInterceptLine.x2)
            }
        });
    }
    handleDragMidLineAnchorRightOnStart = (e, ui) => {
        handleDragMidLineAnchorRightX = this.state.midLineAnchorRight.xAnchor;
    }
    handleDragMidLineAnchorRightOnStop = (e, ui) => {
        handleDragMidLineAnchorRightX = handleDragMidLineAnchorRightX + ui.x;
        
        const res = this.runBarrierCalc(this.state.inputValues, this.state.sourceObject, this.state.receiverObject, this.state.sourceLinePosition, this.state.receiverLinePosition, this.state.barrierPosition);
        this.setState(res);
    }

    displayEffetiveBarrierLocation = () => {
        const { x, y } = calculateEffectiveBarrierPosition(this.state.sourceObject, this.state.receiverObject, this.state.sourceLinePosition, this.state.receiverLinePosition, this.state.barrierPosition);
        return "x: ".concat(x, " and y: ", y)
    }
    displayGroundSurface = () => {
        return this.state.groundSurface.x1.toString().concat(",", this.state.groundSurface.y1, ",", this.state.groundSurface.x2, ",", this.state.groundSurface.y2, ",", this.state.groundSurface.x3, ",", this.state.groundSurface.y3,
            ",", this.state.groundSurface.x4, ",", this.state.groundSurface.y4, ",", this.state.groundSurface.x5, ",", this.state.groundSurface.y5, ",", this.state.groundSurface.x6, ",", this.state.groundSurface.y6);
    }

    render() {
        return (
            <div className="">
                <div className="row">
                    <div className="col">

                        <img src="./car.png" style={{
                            position: 'absolute',
                            left: this.state.carPosition.xCar,
                            top: this.state.carPosition.yCar
                        }} className="App-logo" alt="logo" />

                        <img src="./home.png" style={{
                            position: 'absolute',
                            left: this.state.housePosition.xHouse,
                            top: this.state.housePosition.yHouse
                        }} className="App-logo" alt="logo" />


                        <svg height={this.state.canvasProps.canvasHeight} width={this.state.canvasProps.canvasWidth} className="svgArea">
                            <defs>
                                <marker id="arrowLeft" markerWidth="20" markerHeight="20" refX="0" refY="5" orient="auto" markerUnits="strokeWidth">
                                    <path d="M20,0 L20,12 L2,6 z" fill="#000" />
                                </marker>

                                <marker id="arrowRight" markerWidth="20" markerHeight="20" refX="0" refY="5" orient="auto" markerUnits="strokeWidth">
                                    <path d="M0,0 L0,12 L18,6 z" fill="#000" />
                                </marker>

                                <marker id="arrowLeftSmall" markerWidth="8" markerHeight="8" refX="0" refY="4" orient="auto" markerUnits="strokeWidth">
                                    <path d="M8,0 L8,8 L0,4 z" fill="#9e9494" />
                                </marker>

                                <marker id="arrowRightSmall" markerWidth="8" markerHeight="8" refX="0" refY="4" orient="auto" markerUnits="strokeWidth">
                                    <path d="M0,0 L0,8 L8,4 z" fill="#9e9494" />
                                </marker>
                            </defs>

                            <polygon className="groundSurface" points={this.displayGroundSurface()} />

                            {/* Left Vertical Line for Label */}
                            <line className="float-source source-plane interceptLine" x1={this.state.labelLeftLimitLine.x1}
                                y1={this.state.labelLeftLimitLine.y1} x2={this.state.labelLeftLimitLine.x2}
                                y2={this.state.labelLeftLimitLine.y2} />

                            {/* Right Vertical Line for Label */}
                            <line className="float-source source-plane interceptLine" x1={this.state.labelRightLimitLine.x1}
                                y1={this.state.labelRightLimitLine.y1} x2={this.state.labelRightLimitLine.x2}
                                y2={this.state.labelRightLimitLine.y2} />

                            {/* Source to Receiver Label Horizontal Line and Label */}
                            <line className="float-source source-plane interceptLine" x1={this.state.sourceToReceiverDistanceLabelLine.x1}
                                y1={this.state.sourceToReceiverDistanceLabelLine.y1} x2={this.state.sourceToReceiverDistanceLabelLine.x2 - 16}
                                y2={this.state.sourceToReceiverDistanceLabelLine.y2} markerStart="url(#arrowLeft)" markerEnd="url(#arrowRight)" />

                            <text className="svgText" x={(this.state.sourceToReceiverDistanceLabelLine.x1 + this.state.sourceToReceiverDistanceLabelLine.x2) / 2} y={this.state.sourceToReceiverDistanceLabelLine.y2 + 15}>
                                {parseFloat(this.state.inputValues.horizontalDistanceFromSourceToReceiver).toFixed(1)} m </text>

                            {/* Source to Barrier Label Horizontal Line and Label */}
                            <line className="float-source source-plane interceptLine" x1={this.state.sourceToBarrierLabelHorizontalLine.x1}
                                y1={this.state.sourceToBarrierLabelHorizontalLine.y1} x2={this.state.sourceToBarrierLabelHorizontalLine.x2 - 16}
                                y2={this.state.sourceToBarrierLabelHorizontalLine.y2} markerStart="url(#arrowLeft)" markerEnd="url(#arrowRight)" />

                            <text className="svgText" x={(this.state.sourceToBarrierLabelHorizontalLine.x1 + this.state.sourceToBarrierLabelHorizontalLine.x2) / 2} y={this.state.sourceToBarrierLabelHorizontalLine.y1 + 15}>
                                {((this.state.barrierPosition.x1 + this.state.barrierObjectPositionDelta - this.state.sourceLinePosition.x1) * this.state.inputValues.horizontalDistanceFromSourceToReceiver / (this.state.receiverObject.x1 - this.state.sourceObject.x1)).toFixed(1)} m </text>

                            {/* Receiver to Barrier Label Horizontal Line and Label */}
                            <line className="float-source source-plane interceptLine" x1={this.state.receiverToBarrierLabelHorizontalLine.x1}
                                y1={this.state.receiverToBarrierLabelHorizontalLine.y1} x2={this.state.receiverToBarrierLabelHorizontalLine.x2 - 16}
                                y2={this.state.receiverToBarrierLabelHorizontalLine.y2} markerStart="url(#arrowLeft)" markerEnd="url(#arrowRight)" />

                            <text className="svgText" x={(this.state.receiverToBarrierLabelHorizontalLine.x1 + this.state.receiverToBarrierLabelHorizontalLine.x2) / 2} y={this.state.receiverToBarrierLabelHorizontalLine.y1 + 15}>
                                {(parseFloat(this.state.inputValues.horizontalDistanceFromSourceToReceiver) -
                                    ((this.state.barrierPosition.x1 + this.state.barrierObjectPositionDelta - this.state.sourceLinePosition.x1) * this.state.inputValues.horizontalDistanceFromSourceToReceiver / (this.state.receiverObject.x1 - this.state.sourceObject.x1))).toFixed(1)} m </text>
                            
                            {/* Source to MidLineAnchorLeft Horizontal Line and Label */}
                            <line className="float-source source-plane " x1={this.state.sourceObject.x1}
                            y1={this.state.sourceObject.y1 + 12} x2={this.state.midLinePosition.x1 - 8}
                            y2={this.state.midLinePosition.y1 + 12} markerStart="url(#arrowLeftSmall)" markerEnd="url(#arrowRightSmall)" />

                            <text className="svgTextSmall" x={(this.state.sourceLinePosition.x1 + this.state.sourceLinePosition.x2) / 2} y={this.state.sourceLinePosition.y1 + 22}>
                            {((this.state.midLinePosition.x1 - this.state.sourceObject.x1) * SCALE_X).toFixed(1)} m </text>

                           
                            {/* Source to MidLineAnchorRight Horizontal Line and Label */}
                            <line className="float-source source-plane " x1={this.state.midLinePosition.x2}
                            y1={this.state.receiverObject.y1 + 12} x2={this.state.receiverObject.x1 - 8}
                            y2={this.state.receiverObject.y1 + 12} markerStart="url(#arrowLeftSmall)" markerEnd="url(#arrowRightSmall)" />

                            <text className="svgTextSmall" x={(this.state.receiverLinePosition.x1 + this.state.receiverLinePosition.x2) / 2} y={this.state.receiverObject.y1 + 22}>
                            {((this.state.receiverObject.x1 - this.state.midLinePosition.x2) * SCALE_X).toFixed(1)} m </text>
                        
                            {/* Vertical Distance between SourcePlane and ReceiverPlane Line and Label */}
                            {this.state.receiverObject.y1 == this.state.sourceLinePosition.y1 ? null : (
                                <line className="float-source source-plane interceptLine" x1={this.state.receiverObject.x1 + 220}
                                y1={this.state.sourceObject.y1} x2={this.state.receiverObject.x1 + 220}
                                y2={this.state.receiverObject.y1 - 8} markerStart="url(#arrowLeftSmall)" markerEnd="url(#arrowRightSmall)" />
                            )}

                            {this.state.receiverObject.y1 == this.state.sourceLinePosition.y1 ? null : (
                                <text className="svgTextSmall" x={this.state.receiverObject.x1 + 235} y={(this.state.sourceLinePosition.y1 + this.state.receiverObject.y1) / 2}>
                                    {(Math.abs(this.state.receiverObject.y1 - this.state.sourceLinePosition.y1) * SCALE_Y).toFixed(1)} m
                                </text>
                            )}

                            {/* Source Height Label */}
                            <text className="svgText" x={this.state.sourceHeightTextPosition.x} y={this.state.sourceHeightTextPosition.y}>
                                hs = {((this.state.sourceObject.y1 - this.state.sourceObject.y2) * SCALE_Y).toFixed(1)} m </text>

                            {/* Receiver Height Label */}
                            <text className="svgText" x={this.state.receiverObject.x1 + 120} y={(this.state.receiverObject.y1 + this.state.receiverObject.y2) / 2}>
                                hr = {((this.state.receiverObject.y1 - this.state.receiverObject.y2) * SCALE_Y).toFixed(1)} m </text>

                            {/* Barrier Height Label */}
                            <text className="svgText" x={this.state.barrierPosition.x1 + this.state.barrierObjectPositionDelta + 10} y={(this.state.barrierPosition.y1 + this.state.barrierPosition.y2) / 2}>
                                hb = {((this.state.barrierPosition.y1 - this.state.barrierPosition.y2) * SCALE_Y).toFixed(1)} m </text>
                            
                            {/* Road Center Line Label */}
                            <text className="verticalTextUp svgTextMedium" x={this.state.sourceObject.x1 - 15} y={this.state.sourceObject.y1}>
                            Road Center Line Position</text>
                            
                            <line className="float-source interceptLine interceptLineSource" x1={this.state.sourceToInterceptLine.x1}
                                y1={this.state.sourceToInterceptLine.y1} x2={this.state.sourceToInterceptLine.x2}
                                y2={this.state.sourceToInterceptLine.y2} />

                            <line className="float-source source-plane interceptLine" x1={this.state.receiverToInterceptLine.x1}
                                y1={this.state.receiverToInterceptLine.y1} x2={this.state.receiverToInterceptLine.x2}
                                y2={this.state.receiverToInterceptLine.y2} />

                            <line className="float-source source-plane plane" x1={this.state.sourceLinePosition.x1}
                                y1={this.state.sourceLinePosition.y1} x2={this.state.sourceLinePosition.x2}
                                y2={this.state.sourceLinePosition.y2} />

                            <line className="plane source-plane" x1={this.state.sourceObject.x1}
                                y1={this.state.sourceObject.y1} x2={this.state.sourceObject.x2}
                                y2={this.state.sourceObject.y2} />

                            <line className="float-source" x1={this.state.midLinePosition.x1}
                                y1={this.state.midLinePosition.y1} x2={this.state.midLinePosition.x2}
                                y2={this.state.midLinePosition.y2} className="plane middle-plane" />

                            <Draggable
                                axis="x"
                                handle=".handleMidLineAnchorLeft"
                                grid={[1, 1]}
                                scale={1}
                                onStart={this.handleDragMidLineAnchorLeftOnStart}
                                onDrag={this.handleDragMidLineAnchorLeft}
                                onStop={this.handleDragMidLineAnchorLeftOnStop}
                                bounds={{ top: 0, left: -290, right: handleDragMidLineAnchorRightX - handleDragMidLineAnchorLeftX - 50, bottom: 0 }}>
                                <circle className="handleMidLineAnchorLeft plane source-plane" cx={this.state.midLineAnchorLeft.xAnchor} cy={this.state.midLineAnchorLeft.yAnchor}
                                    r={this.state.midLineAnchorLeft.radius} fill="green" />
                            </Draggable>

                            <Draggable
                                axis="x"
                                handle=".handleMidLineAnchorRight"
                                grid={[1, 1]}
                                scale={1}
                                onStart={this.handleDragMidLineAnchorRightOnStart}
                                onDrag={this.handleDragMidLineAnchorRight}
                                onStop={this.handleDragMidLineAnchorRightOnStop}
                                bounds={{ top: 0, left: -(handleDragMidLineAnchorRightX - handleDragMidLineAnchorLeftX - 50), right: 290, bottom: 0 }}>
                                <circle className="handleMidLineAnchorRight plane source-plane" cx={this.state.midLineAnchorRight.xAnchor} cy={this.state.midLineAnchorRight.yAnchor}
                                    r={this.state.midLineAnchorLeft.radius} fill="red" />
                            </Draggable>


                            <Draggable
                                axis="x"
                                handle=".handle3"
                                position={null}
                                grid={[1, 1]}
                                scale={1}
                                onDrag={this.handleDragBarrier}
                                onStop={this.handleDragBarrierOnStop}
                                position={{ x: 0, y: 0 }}
                                bounds={{
                                    top: 0,
                                    left: this.state.barrierPosition.x1 <= 320 ? 0 : (320 - this.state.barrierPosition.x1),
                                    right: this.state.barrierPosition.x1 >= 1180 ? 0 : (1180 - this.state.barrierPosition.x1),
                                    bottom: 0
                                }}
                            >
                                <line className="handle3 plane source-plane" x1={this.state.barrierPosition.x1}
                                    y1={this.state.barrierPosition.y1} x2={this.state.barrierPosition.x2}
                                    y2={this.state.barrierPosition.y2} />
                            </Draggable>

                            <Draggable
                                axis="y"
                                handle=".handle2"
                                grid={[1, 1]}
                                scale={1}
                                onStart={this.handleDragOnStart}
                                onDrag={this.handleDrag}
                                onStop={this.handleDragOnStop}
                                position={{ x: 0, y: 0 }}
                                bounds={{
                                    top: this.state.receiverLinePosition.y1 <= 125 ? 0 : (125 - this.state.receiverLinePosition.y1),
                                    left: 0,
                                    right: 0,
                                    bottom: this.state.receiverLinePosition.y1 >= 575 ? 0 : (575 - this.state.receiverLinePosition.y1)
                                }}
                            >
                                <line className="handle2 float-source plane receiver-plane" x1={this.state.receiverLinePosition.x1}
                                    y1={this.state.receiverLinePosition.y1} x2={this.state.receiverLinePosition.x2}
                                    y2={this.state.receiverLinePosition.y2} />
                            </Draggable>


                            <Draggable
                                axis="y"
                                handle=".handle4"
                                grid={[1, 1]}
                                scale={1}
                                onStart={this.handleDragReceiverSymbolOnStart}
                                onDrag={this.handleDragReceiverSymbol}
                                onStop={this.handleDragReceiverSymbolOnStop}
                                position={{ x: 0, y: 0 }}
                            // bounds={{ bottom: (this.state.receiverObject.y1 -this.state.receiverObject.y2) * SCALE_Y > 1.5  ? 1000: 0 }}
                            // bounds={{ top: -RECEIVER_HEIGHT_IN_PIXELS * 2, left: 0, right: 0, bottom: 0 }}>
                            >
                                <circle className="handle4 plane source-plane" cx={this.state.receiverSymbol.xAnchor} cy={this.state.receiverSymbol.yAnchor}
                                    r={this.state.receiverSymbol.radius} fill="red" />
                            </Draggable>

                            <line className="handle3 plane source-plane" x1={this.state.receiverObject.x1}
                                y1={this.state.receiverObject.y1}
                                x2={this.state.receiverObject.x2} y2={this.state.receiverObject.y2} />



                        </svg>
                        
                        {/*
                        <div>
                            
                             <label><h6>Breaking LOS - Source Plane: {isBreakingLOS(this.state.sourceObject, this.state.receiverObject, this.state.sourceLinePosition)},
                            Middle Plane: {isBreakingLOS(this.state.sourceObject, this.state.receiverObject, this.state.midLinePosition)},
                            Receiver Plane: {isBreakingLOS(this.state.sourceObject, this.state.receiverObject, this.state.receiverLinePosition)},
                            Barrier: {isBreakingLOS(this.state.sourceObject, this.state.receiverObject, this.state.barrierPosition)} </h6></label><br />

                            <label><h6>Effective barrier location: {this.displayEffetiveBarrierLocation()}
                            </h6></label><br />

                            {this.state.receiverObject.y1 == this.state.sourceLinePosition.y1?null:(<label><h6>Vertical Distance between Source Plane and Receiver Plane: {(Math.abs(this.state.receiverObject.y1 - this.state.sourceLinePosition.y1) * SCALE_Y).toFixed(1)} m</h6></label>)}    
                            <label><h6>Angle - Source and Left Anchor: {angleBetweenPoints(this.state.sourceObject.x2, this.state.sourceObject.y2, this.state.sourceLinePosition.x2, this.state.sourceLinePosition.y2).toFixed(2)},
                            Source and Right Anchor: {angleBetweenPoints(this.state.sourceObject.x2, this.state.sourceObject.y2, this.state.receiverLinePosition.x1, this.state.receiverLinePosition.y1).toFixed(2)},
                            Source and Barrier Top: {angleBetweenPoints(this.state.sourceObject.x2, this.state.sourceObject.y2, this.state.barrierPosition.x2, this.state.barrierPosition.y2).toFixed(2)},
                             </h6></label><br />

                            <label><h6>Angle - Receiver and Left Anchor: {angleBetweenPoints(this.state.sourceLinePosition.x2, this.state.sourceLinePosition.y2, this.state.receiverObject.x2, this.state.receiverObject.y2).toFixed(2)},
                            Receiver and Right Anchor: {angleBetweenPoints(this.state.receiverLinePosition.x1, this.state.receiverLinePosition.y1, this.state.receiverObject.x2, this.state.receiverObject.y2).toFixed(2)},
                            Receiver and Barrier Top: {angleBetweenPoints(this.state.barrierPosition.x2, this.state.barrierPosition.y2, this.state.receiverObject.x2, this.state.receiverObject.y2).toFixed(2)},
                            </h6></label><br />

                            <label><h6>Effective Source Height: {((this.state.sourceObject.y1 - this.state.sourceObject.y2) * SCALE_Y).toFixed(1)} m</h6></label><br />
                            <label><h6>Barrier Height: {((this.state.barrierPosition.y1 - this.state.barrierPosition.y2) * SCALE_Y).toFixed(1)} m</h6></label><br />
                            <label><h6>Receiver Height: {((this.state.receiverObject.y1 - this.state.receiverObject.y2) * SCALE_Y).toFixed(1)} m</h6></label><br />
                            <label><h6>Horizontal Distance from Source to Receiver: {parseFloat(this.state.inputValues.horizontalDistanceFromSourceToReceiver).toFixed(1)} m</h6></label><br />
                            <label><h6>Horizontal Distance from Source to Barrier: {((this.state.barrierPosition.x1 - this.state.sourceLinePosition.x1) * this.state.inputValues.horizontalDistanceFromSourceToReceiver / 900).toFixed(1)} m</h6></label>
                            <label><h6>Distance between Source object to Left Anchor: {(Math.abs(this.state.midLinePosition.x1 - this.state.sourceObject.x1) * SCALE_X).toFixed(1)} m</h6></label><br />
                            <label><h6>Distance between Receiver object to Right Anchor: {(Math.abs(this.state.receiverObject.x1 - this.state.midLinePosition.x2) * SCALE_X).toFixed(1)} m</h6></label><br />
                        </div>
                        */}
                        <div>
                            <p>Instructions (coming soon...)</p>
                            <p>This tool is developed based on the calculation method outlined in this document: <a href="http://publications.gc.ca/collections/collection_2017/schl-cmhc/NH15-27-1981-eng.pdf">CMHC Road and Rail Noise Assessment</a></p>
                        </div>
                    </div>
                    <div className="col-sm-3">
                        <InputForm stateInputs={this.state.inputValues} setStateInputsFromInputForm={this.setStateInputsFromInputForm} runBarrierCalc={this.runBarrierCalc} />
                    </div>
                </div>


            </div>
        )
    }
}
export default Graphics


// <label><h6>First point of contact - Ray from Source: {calculateFirstPointOfContact(this.state.sourceObject, "source", this.state.sourceLinePosition, this.state.receiverLinePosition, this.state.barrierPosition)},
// Ray from Receiver: {calculateFirstPointOfContact(this.state.receiverObject, "receiver", this.state.sourceLinePosition, this.state.receiverLinePosition, this.state.barrierPosition)},
//  </h6></label><br />  
// 


//<OutputForm outputValue = { this.state.inputValues }/>