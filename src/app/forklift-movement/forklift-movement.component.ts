import { TitleCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-forklift-movement',
  standalone: true,
  imports: [
    FormsModule, ReactiveFormsModule,
    TitleCasePipe,
  ],
  templateUrl: './forklift-movement.component.html',
})
export class ForkliftMovementComponent {
  movementOutputs: ForkliftMovement[] = []
  movementOutputsContent: string[] = []
  movementOutputsFinal: string[] = []
  movementOutputsError: string[] = []
  obstablePositions: Position2D[] = []

  movementsForm = new FormGroup({
    movementInput: new FormControl<string>(''),
  })
  obstaclesForm = new FormGroup({
    positionXInput: new FormControl<number | null>(null),
    positionYInput: new FormControl<number | null>(null),
  })


  // Function to submit commands and then execute Forklift movements
  onFormSubmitExecuteCommand() {
    this.movementOutputs = []
    let curOrientation = 0

    this.movementsForm.value.movementInput?.match(/([FBLR])(\d+)/g)?.forEach(movement => {
      const match = movement.match(/([FBLR])(\d+)/)
      if (match) {
        const [_, command, value] = match
        // Check if this is a valid turning command
        if (command === 'R' || command === 'L') {
          if (+value % 90 === 0 && +value > 0 && +value <= 360) {
            if (command === 'R') {
              curOrientation += (+value / 90)
            } else if (command === 'L') {
              curOrientation -= (+value / 90)
            }
          } else {
            // Move to the next command if degrees value is not a divisible of 90
            return
          }
        }
        this.movementOutputs.push(
          new ForkliftMovement(command, +value, this.getOrientation(curOrientation))
        )
      }
    })
    // Run final outputs function
    this.generateMovementOutputs()

    // Reset form
    this.movementsForm.reset()
  }



  getOrientation(index: number): OrientationType {
    index = (index % 4)
    switch (index) {
      case 0:
        return 'north'
      case 1:
        return 'east'
      case 2:
        return 'south'
      case 3:
        return 'west'
      default:
        return 'north'
    }
  }

  // Determine collision by checking if a Position2D is on a Line2D
  getCollisionWithObstacles(start: Position2D, end: Position2D): Position2D | null {
    for (let point of this.obstablePositions) {
      const lineFromPointToStart: Line2D = new Line2D(point, start)
      const lineFromPointToEnd: Line2D = new Line2D(point, end)
      const lineFromEndToStart: Line2D = new Line2D(end, start)

      if (lineFromPointToStart.distance + lineFromPointToEnd.distance === lineFromEndToStart.distance) {
        return point
      }
    }
    return null
  }

  generateMovementOutputs() {
    // Setup and reset variables
    this.movementOutputsContent = []
    this.movementOutputsFinal = []
    this.movementOutputsError = []
    let curPos: Position2D = new Position2D(0, 0)

    // Iterate through all movements found
    for (let move of this.movementOutputs) {
      let translateByVector = new Position2D(0, 0)
      switch (move.orientation) {
        case 'north':
          if (move.command === 'F') { translateByVector.y += move.value }
          else if (move.command === 'B') { translateByVector.y -= move.value }
          break
        case 'east':
          if (move.command === 'F') { translateByVector.x += move.value }
          else if (move.command === 'B') { translateByVector.x -= move.value }
          break
        case 'south':
          if (move.command === 'F') { translateByVector.y -= move.value }
          else if (move.command === 'B') { translateByVector.y += move.value }
          break
        case 'west':
          if (move.command === 'F') { translateByVector.x -= move.value }
          else if (move.command === 'B') { translateByVector.x += move.value }
          break
      }
      // Capture previous position for collision detection
      const prevPos: Position2D = new Position2D(curPos.x, curPos.y)

      // Translate current point to new position
      curPos.translate(translateByVector)

      // Add to current outputs Content array
      this.movementOutputsContent.push(move.toString())

      // Check if collsion occurred
      const collisionPos = this.getCollisionWithObstacles(prevPos, curPos)
      if (collisionPos) {
        // If collision occurred then: Save errors and stop processing further commands
        this.movementOutputsError.push(`Obstacle encountered at ${collisionPos.toString()}`)
        return
      }
    }

    // No collision occurred therefore push Final outputs
    this.movementOutputsFinal.push(`Final position: ${curPos.toString()}`)
    this.movementOutputsFinal.push(`Facing: ${this.movementOutputs.at(-1)?.orientation}`)
  }



  // Function to add obstacles to a list of Position2D array
  onFormSubmitAddObstacle() {
    this.movementOutputs = []
    const posX = this.obstaclesForm.value.positionXInput
    const posY = this.obstaclesForm.value.positionYInput

    if (posX != null && posY != null) {
      this.obstablePositions.push(new Position2D(posX, posY))
    }

    // Reset form
    this.obstaclesForm.reset()
  }

  onClearAllPositionAndOutputs() {
    this.obstablePositions = []
    this.movementOutputs = []
  }
}


type OrientationType = 'north' | 'east' | 'south' | 'west'

class ForkliftMovement {
  command: string
  value: number
  orientation: OrientationType

  constructor(command: string, value: number, orientation: OrientationType) {
    this.command = command
    this.value = value
    this.orientation = orientation
  }

  toString(): string {
    let commandStr: string = ''
    switch (this.command) {
      case ('F'):
        commandStr = `Move Forward by ${this.value} metres.`
        break
      case ('B'):
        commandStr = `Move Backward by ${this.value} metres.`
        break
      case ('R'):
        commandStr = `Turn Right by ${this.value} degrees.`
        break
      case ('L'):
        commandStr = `Turn Left by ${this.value} degrees.`
        break
    }
    return commandStr
  }
}

class Position2D {
  x: number
  y: number

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }

  translate(vector: Position2D) {
    this.x += vector.x
    this.y += vector.y
  }

  toString(): string {
    return `(${this.x}, ${this.y})`
  }
}

class Line2D {
  startPos: Position2D
  endPos: Position2D
  distance: number

  constructor(startPos: Position2D, endPos: Position2D) {
    this.startPos = startPos
    this.endPos = endPos
    this.distance = this.getDistance()
  }

  getDistance(): number {
    return Math.sqrt(
      Math.pow(this.endPos.x - this.startPos.x, 2)
      + Math.pow(this.endPos.y - this.startPos.y, 2)
    )
  }
}