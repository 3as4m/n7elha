import { describe, it, expect } from "vitest";
import {
  towerHeight, builtHeight, partialCourse, climbNeed, paceRate, lavaNow, towerName, bricksPerAnswer, eruptRise, isOut, livesLeft, rankTowers, decidedEarly, LIVES, catchUpRate, LAG_MAX,
  MIN_RATE, MAX_RATE, PACE, PACE_TEAMS, ERUPT_RISE,
} from "@/lib/lavaFloor";
import { layoutTowers, type BoardTower } from "@/lib/lavaFloorRender";

const tower = (width: number, bricks: number, base = 3) => ({ width, bricks, base });

describe("tower height", () => {
  it("counts only finished courses", () => {
    expect(towerHeight(tower(1, 4))).toBe(7);
    expect(towerHeight(tower(5, 9))).toBe(4);   // one full course of 5, four bricks into the next
    expect(partialCourse(tower(5, 9))).toBe(4);
  });

  it("climbs at the same pace per student whatever the tower's width", () => {
    // each of n students lays k bricks: a solo pillar and an n-wide wall both rise k
    for (const n of [1, 4, 30]) expect(towerHeight(tower(n, n * 6))).toBe(3 + 6);
  });

  it("never divides by a zero width", () => {
    expect(towerHeight(tower(0, 3))).toBe(6);
  });

  it("lays a whole course per answer in team mode, one brick otherwise", () => {
    expect(bricksPerAnswer("teams", 7)).toBe(7);
    expect(bricksPerAnswer("class", 30)).toBe(1);
    expect(bricksPerAnswer("solo", 1)).toBe(1);
    // three team answers: three courses up, nothing left half-built
    const t = tower(7, 3 * bricksPerAnswer("teams", 7));
    expect(towerHeight(t)).toBe(3 + 3);
    expect(partialCourse(t)).toBe(0);
  });
});

describe("winning", () => {
  it("counts what was built, so a rescue lift never beats staying out of the lava", () => {
    const stayedOut = { width: 2, bricks: 16, base: 3 };     // 8 courses, never fell in
    const rescued = { width: 2, bricks: 10, base: 9 };       // 5 courses, lifted by a rescue
    expect(towerHeight(rescued)).toBeGreaterThan(towerHeight(stayedOut));
    expect(builtHeight(stayedOut)).toBeGreaterThan(builtHeight(rescued));
  });
});

describe("lives", () => {
  const t = (dunks: number, dunked: boolean, bricks = 10) => ({ width: 1, bricks, base: 3, dunks, dunked });

  it("costs a life per fall and puts a tower out on its last one", () => {
    expect(livesLeft(t(0, false))).toBe(LIVES);
    expect(livesLeft(t(1, true))).toBe(LIVES - 1);
    expect(isOut(t(LIVES - 1, true))).toBe(false);
    expect(isOut(t(LIVES, true))).toBe(true);
  });

  it("ranks the towers still standing above any that are out", () => {
    const tall = { ...t(LIVES, true, 50), id: "tall" }, short = { ...t(1, false, 5), id: "short" };
    expect(rankTowers([tall, short])[0].id).toBe("short");
  });

  it("ends early with one tower left, or when the class wall is out", () => {
    expect(decidedEarly([t(LIVES, true), t(0, false)])).toBe(true);
    expect(decidedEarly([t(1, true), t(0, false)])).toBe(false);
    expect(decidedEarly([t(0, false)])).toBe(false);
    expect(decidedEarly([t(LIVES, true)])).toBe(true);
  });
});

describe("lava catch-up", () => {
  it("keeps its pace while close, and is pulled up when it trails the race", () => {
    expect(catchUpRate(0.4, 10, 10 + LAG_MAX)).toBe(0.4);
    expect(catchUpRate(0.4, 10, null)).toBe(0.4);
    expect(catchUpRate(0.4, 10, 30)).toBeGreaterThan(0.4);
    expect(catchUpRate(0.4, 10, 40)).toBeGreaterThan(catchUpRate(0.4, 10, 30));
  });
});

describe("climbing out", () => {
  it("asks two answers of one student and one of each member of a group", () => {
    expect(climbNeed(1)).toBe(2);
    expect(climbNeed(6)).toBe(6);
  });
});

describe("lava pace", () => {
  it("runs closer behind team towers, with bigger eruptions", () => {
    expect(paceRate([0.6, 0.6], "teams")).toBeCloseTo(0.6 * PACE_TEAMS);
    expect(paceRate([0.6, 0.6], "teams")).toBeGreaterThan(paceRate([0.6, 0.6]));
    expect(eruptRise("teams", [7, 7, 7])).toBeGreaterThan(ERUPT_RISE);
    expect(eruptRise("class", [30])).toBe(ERUPT_RISE);
  });

  it("follows the typical tower, not the leader", () => {
    expect(paceRate([0.1, 0.1, 0.1, 5])).toBeCloseTo(0.1 * PACE);
  });

  it("never stands still and never runs away", () => {
    expect(paceRate([])).toBe(MIN_RATE);
    expect(paceRate([0, 0])).toBe(MIN_RATE);
    expect(paceRate([10, 10])).toBe(MAX_RATE);
  });

  it("carries on from the last snapshot", () => {
    const at = new Date(1_000_000).toISOString();
    expect(lavaNow({ level: 2, at, rate: 0.5 }, 1_000_000 + 4000)).toBeCloseTo(4);
    expect(lavaNow({ level: 2, at, rate: 0.5 }, 1_000_000 - 4000)).toBe(2);
  });
});

describe("tower names", () => {
  it("names teams by color and the class as one", () => {
    expect(towerName("teams", { idx: 1, name: null }, false)).toBe("Blue team");
    expect(towerName("class", { idx: 0, name: null }, false)).toBe("The class");
    expect(towerName("solo", { idx: 3, name: "Sara" }, false)).toBe("Sara");
  });
});

describe("board layout", () => {
  const board = (widths: number[]): BoardTower[] => widths.map((width, i) => ({
    id: String(i), width, courses: 3, partial: 0, color: "#000", dunked: false, climb: 0, need: 2, lives: 3, out: false, members: [],
  }));

  it("keeps every tower on screen and in order", () => {
    for (const widths of [[1, 1, 1, 1], [8, 7, 7], [30]]) {
      const { pos } = layoutTowers(board(widths), 1440, 70);
      pos.forEach((p, i) => {
        expect(p.x0).toBeGreaterThanOrEqual(0);
        expect(p.x1).toBeLessThanOrEqual(1440);
        if (i) expect(p.x0).toBeGreaterThan(pos[i - 1].x1);
      });
    }
  });

  it("centers a phone on the player's own slot when the wall is wider than the screen", () => {
    const { pos } = layoutTowers(board([30]), 375, 16, 46, { tower: 0, slot: 15 });
    expect(Math.abs(pos[0].slotX(15) - 375 / 2)).toBeLessThan(46);
  });
});
