/**
 * WASTELAND CHRONICLES — game.js
 * Full open-world RPG engine
 * Single file: Config → Data → Engine → Rendering → UI → Bootstrap
 */
'use strict';

// ============================================================
// CONFIG
// ============================================================
const CFG = {
  CANVAS_W: 960, CANVAS_H: 540,
  TILE:  40,          // world tile size
  WORLD_W: 120,       // tiles wide per zone
  WORLD_H: 80,        // tiles tall per zone
  ZONES: 4,
  PLAYER_SPEED: 3.2,
  GRAVITY: 0.55,
  JUMP_FORCE: -12,
  MAX_FALL: 16,
  ENEMY_AGGRO: 280,   // pixels
  SAVE_KEY: 'wc_save_v1',
  BASE_HP: 100,
  HP_PER_VIT: 20,
  EP_PER_INT: 10,
  ITEMS_MAX: 24,
  AUDIO_MASTER: 0.4,
};

// ============================================================
// ITEM DATABASE
// ============================================================
const ITEMS_DB = {
  /* WEAPONS — MELEE */
  melee_1:  { id:'melee_1',  name:'Rusty Pipe',     type:'weapon', sub:'melee', icon:'assets/images/weapons-melee/melee_1.png',  atk:8,  spd:1.0, rarity:'common',   desc:'Basic blunt weapon' },
  melee_2:  { id:'melee_2',  name:'Scrap Blade',    type:'weapon', sub:'melee', icon:'assets/images/weapons-melee/melee_2.png',  atk:14, spd:1.1, rarity:'common',   desc:'Jagged scrap metal blade' },
  melee_3:  { id:'melee_3',  name:'Machete',        type:'weapon', sub:'melee', icon:'assets/images/weapons-melee/melee_3.png',  atk:20, spd:1.2, rarity:'uncommon', desc:'Survival machete, balanced and reliable' },
  melee_4:  { id:'melee_4',  name:'Iron Club',      type:'weapon', sub:'melee', icon:'assets/images/weapons-melee/melee_4.png',  atk:24, spd:0.8, rarity:'uncommon', desc:'Heavy bludgeoner' },
  melee_5:  { id:'melee_5',  name:'Chainsaw Sword', type:'weapon', sub:'melee', icon:'assets/images/weapons-melee/melee_5.png',  atk:35, spd:1.3, rarity:'rare',     desc:'Roaring death machine' },
  melee_6:  { id:'melee_6',  name:'Bone Spear',     type:'weapon', sub:'melee', icon:'assets/images/weapons-melee/melee_6.png',  atk:28, spd:1.4, rarity:'rare',     desc:'Long reach, crafted from mutant bone' },
  melee_7:  { id:'melee_7',  name:'Void Saber',     type:'weapon', sub:'melee', icon:'assets/images/weapons-melee/melee_7.png',  atk:50, spd:1.5, rarity:'epic',     desc:'Humming with dark energy' },
  melee_8:  { id:'melee_8',  name:'Apocalypse Axe', type:'weapon', sub:'melee', icon:'assets/images/weapons-melee/melee_8.png',  atk:65, spd:0.9, rarity:'legendary',desc:'The last great weapon of the old world' },

  /* WEAPONS — CYBER/RANGED */
  cyber_1:  { id:'cyber_1',  name:'Zip Gun',        type:'weapon', sub:'ranged', icon:'assets/images/weapons-cyber/cyber_1.png',  atk:12, spd:1.5, range:1, rarity:'common',   desc:'Makeshift pistol' },
  cyber_2:  { id:'cyber_2',  name:'Plasma Pistol',  type:'weapon', sub:'ranged', icon:'assets/images/weapons-cyber/cyber_2.png',  atk:22, spd:1.4, range:1, rarity:'uncommon', desc:'Fires superheated plasma bolts' },
  cyber_3:  { id:'cyber_3',  name:'Arc Rifle',      type:'weapon', sub:'ranged', icon:'assets/images/weapons-cyber/cyber_3.png',  atk:34, spd:1.1, range:2, rarity:'rare',     desc:'High-voltage arc rounds' },
  cyber_4:  { id:'cyber_4',  name:'Railgun Mk.I',   type:'weapon', sub:'ranged', icon:'assets/images/weapons-cyber/cyber_4.png',  atk:55, spd:0.7, range:2, rarity:'epic',     desc:'Magnetic propulsion rifle' },
  cyber_5:  { id:'cyber_5',  name:'Void Blaster',   type:'weapon', sub:'ranged', icon:'assets/images/weapons-cyber/cyber_5.png',  atk:78, spd:1.2, range:2, rarity:'legendary',desc:'Tears holes in reality' },

  /* MEDICINE */
  med_1:  { id:'med_1',  name:'Bandage',         type:'consumable', sub:'heal', icon:'assets/images/medicine/med_1.png',  heal:25,  rarity:'common',   desc:'Stops bleeding. Restores 25 HP' },
  med_2:  { id:'med_2',  name:'Med-Kit',         type:'consumable', sub:'heal', icon:'assets/images/medicine/med_2.png',  heal:60,  rarity:'uncommon', desc:'Standard medic kit. Restores 60 HP' },
  med_3:  { id:'med_3',  name:'Stim Injector',   type:'consumable', sub:'heal', icon:'assets/images/medicine/med_3.png',  heal:100, rarity:'rare',     desc:'Combat stimulant. Restores 100 HP' },
  med_4:  { id:'med_4',  name:'Nano-Heal',        type:'consumable', sub:'heal', icon:'assets/images/medicine/med_4.png',  heal:200, rarity:'epic',     desc:'Nanobots repair tissue. Restores 200 HP' },
  med_5:  { id:'med_5',  name:'Full Restore',     type:'consumable', sub:'heal', icon:'assets/images/medicine/med_5.png',  heal:9999,rarity:'legendary',desc:'Restores all HP' },
  med_6:  { id:'med_6',  name:'Antitoxin',        type:'consumable', sub:'heal', icon:'assets/images/medicine/med_6.png',  heal:40,  rarity:'common',   desc:'Cures poison. Restores 40 HP' },
  med_7:  { id:'med_7',  name:'Trauma Pack',      type:'consumable', sub:'heal', icon:'assets/images/medicine/med_7.png',  heal:80,  rarity:'uncommon', desc:'Emergency field kit. Restores 80 HP' },

  /* ARMOR (represented via medicine icons for now — loot drops) */
  armor_1: { id:'armor_1', name:'Scrap Vest',      type:'armor', icon:'assets/images/medicine/med_8.png',  def:5,  rarity:'common',   desc:'+5 Defense' },
  armor_2: { id:'armor_2', name:'Leather Coat',    type:'armor', icon:'assets/images/medicine/med_9.png',  def:12, rarity:'uncommon', desc:'+12 Defense' },
  armor_3: { id:'armor_3', name:'Combat Plate',    type:'armor', icon:'assets/images/medicine/med_10.png', def:22, rarity:'rare',     desc:'+22 Defense' },
  armor_4: { id:'armor_4', name:'Exo-Suit Mk.I',   type:'armor', icon:'assets/images/medicine/med_11.png', def:38, rarity:'epic',     desc:'+38 Defense' },
  armor_5: { id:'armor_5', name:'Titan Carapace',  type:'armor', icon:'assets/images/medicine/med_12.png', def:55, rarity:'legendary',desc:'+55 Defense, +50 Max HP' },
};

// ============================================================
// SKILL TREE DATA
// ============================================================
const SKILLS_DATA = {
  warrior: [
    { id:'w1', name:'Iron Strike',   icon:'assets/images/skills/skill_1.png',  maxLv:3, cost:1, requires:null,  desc:'Powerful melee strike. Deals 120%/150%/200% weapon dmg.', epCost:15, cdSec:3  },
    { id:'w2', name:'Whirlwind',     icon:'assets/images/skills/skill_2.png',  maxLv:3, cost:1, requires:'w1',  desc:'Spin attack hitting all nearby enemies.', epCost:25, cdSec:6  },
    { id:'w3', name:'Berserker',     icon:'assets/images/skills/skill_3.png',  maxLv:3, cost:2, requires:'w1',  desc:'+10%/20%/30% attack speed for 8s.', epCost:20, cdSec:15 },
    { id:'w4', name:'Ground Slam',   icon:'assets/images/skills/skill_4.png',  maxLv:2, cost:2, requires:'w2',  desc:'Slam that stuns enemies for 1.5s.', epCost:30, cdSec:8  },
    { id:'w5', name:'Titan Body',    icon:'assets/images/skills/skill_5.png',  maxLv:2, cost:2, requires:'w3',  desc:'+20%/40% max HP permanently.', epCost:0,  cdSec:0  },
    { id:'w6', name:'Last Stand',    icon:'assets/images/skills/skill_6.png',  maxLv:1, cost:3, requires:'w5',  desc:'When HP <20%, gain 200% dmg for 10s. 60s CD.', epCost:0, cdSec:60 },
  ],
  ranger: [
    { id:'r1', name:'Quick Shot',    icon:'assets/images/skills/skill_7.png',  maxLv:3, cost:1, requires:null,  desc:'Rapid shot, 3 bullets in 0.5s.', epCost:12, cdSec:4  },
    { id:'r2', name:'Sniper Mark',   icon:'assets/images/skills/skill_8.png',  maxLv:3, cost:1, requires:'r1',  desc:'Mark enemy — next hit deals 200%/250%/300% dmg.', epCost:20, cdSec:8  },
    { id:'r3', name:'Shadow Step',   icon:'assets/images/skills/skill_9.png',  maxLv:2, cost:1, requires:'r1',  desc:'Teleport dash forward 200px.', epCost:18, cdSec:5  },
    { id:'r4', name:'Explosive Shot',icon:'assets/images/skills/skill_10.png', maxLv:2, cost:2, requires:'r2',  desc:'Grenade-tipped round, AoE explosion.', epCost:35, cdSec:10 },
    { id:'r5', name:'Eagle Eye',     icon:'assets/images/skills/skill_11.png', maxLv:3, cost:2, requires:'r2',  desc:'+10%/20%/30% crit chance permanently.', epCost:0, cdSec:0  },
    { id:'r6', name:'Death Rain',    icon:'assets/images/skills/skill_12.png', maxLv:1, cost:3, requires:'r4',  desc:'Barrage — 12 shots in 2s. 45s CD.', epCost:60, cdSec:45 },
  ],
  tech: [
    { id:'t1', name:'EMP Pulse',     icon:'assets/images/skills/skill_13.png', maxLv:3, cost:1, requires:null,  desc:'Stun all enemies on screen for 1s/1.5s/2s.', epCost:25, cdSec:10 },
    { id:'t2', name:'Shield Drone',  icon:'assets/images/skills/skill_14.png', maxLv:3, cost:1, requires:'t1',  desc:'Absorb 30/60/90 dmg. Lasts 15s.', epCost:30, cdSec:20 },
    { id:'t3', name:'Nanobots',      icon:'assets/images/skills/skill_15.png', maxLv:3, cost:2, requires:'t1',  desc:'Regen 5/10/15 HP/s for 5s.', epCost:20, cdSec:12 },
    { id:'t4', name:'Turret Deploy', icon:'assets/images/skills/skill_16.png', maxLv:2, cost:2, requires:'t2',  desc:'Deploy turret that shoots enemies for 8s.', epCost:40, cdSec:25 },
    { id:'t5', name:'Overclock',     icon:'assets/images/skills/skill_17.png', maxLv:2, cost:2, requires:'t3',  desc:'+30%/50% move speed for 6s.', epCost:25, cdSec:15 },
    { id:'t6', name:'Nuke Drone',    icon:'assets/images/skills/skill_18.png', maxLv:1, cost:3, requires:'t4',  desc:'Launch drone that explodes for massive AoE dmg. 60s CD.', epCost:80, cdSec:60 },
  ],
};

// ============================================================
// ENEMY TYPES
// ============================================================
const ENEMY_TYPES = [
  // Zone 0 — Ruined Peaks
  { id:'bandit',     name:'Wasteland Bandit', zone:0, hp:60,  atk:12, def:2,  spd:1.8, xp:25,  gold:[3,8],    icon:'bandit',    color:'#8B4513', size:36 },
  { id:'rabid_dog',  name:'Rabid Hound',      zone:0, hp:35,  atk:15, def:1,  spd:3.0, xp:18,  gold:[1,4],    icon:'dog',       color:'#696969', size:28 },
  { id:'mutant',     name:'Plague Mutant',    zone:0, hp:80,  atk:18, def:4,  spd:1.5, xp:35,  gold:[5,12],   icon:'mutant',    color:'#556B2F', size:40 },
  { id:'raider',     name:'Peak Raider',      zone:0, hp:100, atk:22, def:6,  spd:2.0, xp:50,  gold:[8,18],   icon:'raider',    color:'#8B0000', size:40 },
  // Zone 1 — Toxic Wastes
  { id:'scorpion',   name:'Radscorpion',      zone:1, hp:120, atk:28, def:8,  spd:2.5, xp:65,  gold:[10,20],  icon:'scorpion',  color:'#4B0082', size:44 },
  { id:'zombie',     name:'Toxic Shambler',   zone:1, hp:90,  atk:20, def:5,  spd:1.2, xp:45,  gold:[6,15],   icon:'zombie',    color:'#2F4F4F', size:38 },
  { id:'sniper',     name:'Rogue Sniper',     zone:1, hp:70,  atk:35, def:3,  spd:1.5, xp:70,  gold:[12,25],  icon:'sniper',    color:'#4A3728', size:36 },
  // Zone 2 — Cyber Ruins
  { id:'cyborg',     name:'Rogue Cyborg',     zone:2, hp:180, atk:40, def:15, spd:2.0, xp:100, gold:[20,40],  icon:'cyborg',    color:'#1C1C8A', size:46 },
  { id:'mech_drone', name:'Security Drone',   zone:2, hp:120, atk:32, def:12, spd:3.0, xp:80,  gold:[15,30],  icon:'drone',     color:'#2F4F4F', size:34 },
  { id:'terminator', name:'TermBot MK-3',     zone:2, hp:250, atk:55, def:20, spd:1.8, xp:150, gold:[30,60],  icon:'term',      color:'#333355', size:50 },
  // Zone 3 — The Sanctum (final)
  { id:'cultist',    name:'Void Cultist',     zone:3, hp:200, atk:50, def:18, spd:2.2, xp:120, gold:[25,50],  icon:'cultist',   color:'#4B0082', size:40 },
  { id:'shadow',     name:'Shadow Walker',    zone:3, hp:160, atk:65, def:10, spd:3.5, xp:140, gold:[30,55],  icon:'shadow',    color:'#111122', size:36 },
  // BOSSES
  { id:'boss_0', name:'The Mountain King',   zone:0, hp:800,  atk:45, def:15, spd:1.5, xp:500,  gold:[80,120], boss:true, icon:'boss0', color:'#8B4513', size:80 },
  { id:'boss_1', name:'Swamp Horror',        zone:1, hp:1200, atk:60, def:20, spd:1.8, xp:800,  gold:[120,180],boss:true, icon:'boss1', color:'#228B22', size:90 },
  { id:'boss_2', name:'TermLord OMEGA',      zone:2, hp:2000, atk:80, def:30, spd:2.0, xp:1200, gold:[200,300],boss:true, icon:'boss2', color:'#191970', size:100 },
  { id:'boss_3', name:'The Void God',        zone:3, hp:3500, atk:100,def:40, spd:2.2, xp:2000, gold:[400,600],boss:true, icon:'boss3', color:'#4B0082', size:120 },
];

// ============================================================
// ZONE DEFINITIONS
// ============================================================
const ZONE_DEF = [
  { id:0, name:'Ruined Peaks',    bg:'assets/images/backgrounds/bg1.png', music:'assets/audio/music/main.mp3',    battle:'assets/audio/music/battle.mp3', ground:'#3d2e1a', platform:'#5a4020', fog:'rgba(20,15,10,0.4)'  },
  { id:1, name:'Toxic Wastes',    bg:'assets/images/backgrounds/bg2.png', music:'assets/audio/music/ambient.mp3', battle:'assets/audio/music/battle.mp3', ground:'#1a2e10', platform:'#2a4018', fog:'rgba(10,30,10,0.35)' },
  { id:2, name:'Cyber Ruins',     bg:'assets/images/backgrounds/bg3.png', music:'assets/audio/music/dark.mp3',    battle:'assets/audio/music/battle.mp3', ground:'#101020', platform:'#1a1a35', fog:'rgba(5,5,25,0.4)'   },
  { id:3, name:'The Sanctum',     bg:'assets/images/backgrounds/bg4.png', music:'assets/audio/music/dark.mp3',    battle:'assets/audio/music/battle.mp3', ground:'#1a0a20', platform:'#2a0a35', fog:'rgba(20,0,30,0.45)' },
];

// ============================================================
// UTILS
// ============================================================
const U = {
  rand: (a, b) => Math.random() * (b - a) + a,
  randInt: (a, b) => Math.floor(Math.random() * (b - a + 1)) + a,
  clamp: (v, lo, hi) => Math.max(lo, Math.min(hi, v)),
  lerp: (a, b, t) => a + (b - a) * t,
  dist: (a, b) => Math.hypot(a.x - b.x, a.y - b.y),
  overlap: (a, b) => a.x < b.x+b.w && a.x+a.w > b.x && a.y < b.y+b.h && a.y+a.h > b.y,
  rectOf: (e) => ({ x: e.x, y: e.y, w: e.w || e.size || 36, h: e.h || e.size || 36 }),
};

// ============================================================
// AUDIO MANAGER
// ============================================================
class AudioMgr {
  constructor() {
    this.ctx = null;
    this.music = null;
    this.sounds = {};
    this.enabled = true;
    this.musicVol = 0.35;
    this.sfxVol   = 0.5;
    this._init();
  }
  _init() {
    try { this.ctx = new (window.AudioContext || window.webkitAudioContext)(); } catch(e) {}
  }
  _resume() { if (this.ctx?.state === 'suspended') this.ctx.resume(); }

  playMusic(src, loop = true) {
    if (!this.enabled) return;
    if (this.music && this.music.src && this.music.src.endsWith(src.split('/').pop())) return;
    if (this.music) { this.music.pause(); this.music = null; }
    const a = new Audio(src);
    a.loop = loop;
    a.volume = this.musicVol;
    a.play().catch(() => {});
    this.music = a;
  }

  stopMusic() { if (this.music) { this.music.pause(); this.music = null; } }

  playSound(src, vol = 1.0) {
    if (!this.enabled) return;
    this._resume();
    try {
      const a = new Audio(src);
      a.volume = U.clamp(vol * this.sfxVol, 0, 1);
      a.play().catch(() => {});
    } catch(e) {}
  }

  toggle() { this.enabled = !this.enabled; if (!this.enabled) this.stopMusic(); }
}

// ============================================================
// WORLD GENERATOR
// ============================================================
class WorldGen {
  static generate(zoneId) {
    const W = CFG.WORLD_W, H = CFG.WORLD_H, T = CFG.TILE;
    const zone = ZONE_DEF[zoneId];
    const tiles = [];
    const platforms = [];
    const spawnPoints = [];
    const items = [];
    const enemies = [];
    const loot = [];

    // Ground line with variation
    const groundY = Math.floor(H * 0.72);

    // Fill basic tiles
    for (let ty = 0; ty < H; ty++) {
      tiles[ty] = [];
      for (let tx = 0; tx < W; tx++) {
        if (ty >= groundY) {
          tiles[ty][tx] = 1; // solid ground
        } else {
          tiles[ty][tx] = 0; // air
        }
      }
    }

    // Terrain bumps
    for (let tx = 0; tx < W; tx++) {
      const bump = Math.round(Math.sin(tx * 0.18) * 2 + Math.cos(tx * 0.08) * 3);
      for (let b = 0; b < Math.abs(bump); b++) {
        const ty = groundY + (bump < 0 ? -(b+1) : (b+1));
        if (ty >= 0 && ty < H) tiles[ty][tx] = bump < 0 ? 0 : 1;
      }
    }

    // Floating platforms
    const numPlatforms = 18 + zoneId * 4;
    for (let i = 0; i < numPlatforms; i++) {
      const px = U.randInt(3, W - 8) * T;
      const py = U.randInt(Math.floor(groundY * 0.35), Math.floor(groundY * 0.75)) * T;
      const pw = U.randInt(3, 7) * T;
      platforms.push({ x: px, y: py, w: pw, h: T });
    }

    // Spawn zones (clusters)
    const enemyTypes = ENEMY_TYPES.filter(e => e.zone === zoneId && !e.boss);
    const bossType   = ENEMY_TYPES.find(e => e.zone === zoneId && e.boss);

    // Spawn ~30 regular enemies
    for (let i = 0; i < 30; i++) {
      const et = enemyTypes[U.randInt(0, enemyTypes.length - 1)];
      const ex = U.rand(T * 8, T * (W - 8));
      const ey = (groundY - 1) * T - et.size;
      enemies.push({ ...et, x: ex, y: ey, hp: et.hp, maxHp: et.hp, alive: true, uid: `e_${i}_${zoneId}` });
    }

    // Boss at 80% of zone
    if (bossType) {
      enemies.push({ ...bossType, x: T * (W - 15), y: (groundY - 1) * T - bossType.size, hp: bossType.hp, maxHp: bossType.hp, alive: true, uid: `boss_${zoneId}` });
    }

    // Scatter loot
    const weaponKeys = Object.keys(ITEMS_DB).filter(k => ITEMS_DB[k].type === 'weapon');
    const medKeys    = Object.keys(ITEMS_DB).filter(k => ITEMS_DB[k].type === 'consumable');
    const armorKeys  = Object.keys(ITEMS_DB).filter(k => ITEMS_DB[k].type === 'armor');

    for (let i = 0; i < 20; i++) {
      const pool = Math.random() < 0.4 ? medKeys : (Math.random() < 0.5 ? weaponKeys : armorKeys);
      const key  = pool[U.randInt(0, pool.length - 1)];
      const lx   = U.rand(T * 5, T * (W - 5));
      const ly   = (groundY - 1) * T - 28;
      loot.push({ itemId: key, x: lx, y: ly, taken: false, uid: `loot_${i}_${zoneId}` });
    }

    // Player start
    const playerStart = { x: T * 4, y: (groundY - 1) * T - 60 };

    // Transition to next zone (right edge)
    const exitX = T * (W - 3);
    const exitY = (groundY - 1) * T - 60;

    return {
      zoneId, tiles, platforms, enemies, loot,
      groundY: groundY * T, W: W * T, H: H * T,
      playerStart, exitX, exitY,
      zoneDef: zone,
    };
  }
}

// ============================================================
// PLAYER
// ============================================================
class Player {
  constructor(save) {
    if (save) {
      Object.assign(this, save);
    } else {
      this.name   = 'Survivor';
      this.level  = 1;
      this.xp     = 0;
      this.xpNext = 100;
      this.freePoints = 3;
      this.skillPoints = 0;

      // Base stats
      this.str = 5; this.agi = 5; this.intl = 5; this.vit = 5;

      this.maxHp  = CFG.BASE_HP;
      this.hp     = CFG.BASE_HP;
      this.maxEp  = 50;
      this.ep     = 50;
      this.gold   = 0;
      this.kills  = 0;
      this.critChance = 0.05;

      this.equipped   = { weapon: null, armor: null };
      this.inventory  = [];  // [{itemId, qty}]

      this.skills  = {};  // skillId -> level
      this.activeSkill1 = null;
      this.activeSkill2 = null;

      this.checkpoints = [0, null, null, null]; // highest zone reached per zone
      this.currentZone = 0;
      this.deathCount  = 0;
      this.playTime    = 0;

      // Starting item
      this.inventory.push({ itemId: 'melee_1', qty: 1 });
      this.inventory.push({ itemId: 'med_1',   qty: 3 });
      this.equipped.weapon = 'melee_1';
    }

    // Runtime (not saved)
    this.x = 200; this.y = 200;
    this.w = 28; this.h = 48;
    this.vx = 0; this.vy = 0;
    this.onGround = false;
    this.facing = 1;
    this.attackCd    = 0;
    this.skill1Cd    = 0;
    this.skill2Cd    = 0;
    this.invincible  = 0;
    this.shieldHp    = 0;
    this.regenTimer  = 0;
    this.speedBoost  = 0;
    this.berserk     = 0;
    this.animFrame   = 0;
    this.animTimer   = 0;
    this.state       = 'idle'; // idle, walk, jump, attack, hurt, dead
    this.stateTimer  = 0;
    this.isAttacking = false;
    this.attackBox   = null;
    this.critActive  = false;
  }

  get weaponDef()  { return this.equipped.weapon  ? ITEMS_DB[this.equipped.weapon]  : null; }
  get armorDef()   { return this.equipped.armor   ? ITEMS_DB[this.equipped.armor]   : null; }
  get totalAtk()   {
    const base = (this.weaponDef?.atk || 5);
    const strBonus = this.str * 1.5;
    const berserkMult = this.berserk > 0 ? 3 : 1;
    return Math.floor((base + strBonus) * berserkMult * (this.critActive ? 2.5 : 1));
  }
  get totalDef()   { return (this.armorDef?.def || 0) + Math.floor(this.vit * 0.5); }
  get moveSpeed()  { return CFG.PLAYER_SPEED + this.agi * 0.08 + (this.speedBoost > 0 ? 2 : 0); }

  computeMaxStats() {
    this.maxHp = CFG.BASE_HP + this.vit * CFG.HP_PER_VIT + (this.armorDef?.id === 'armor_5' ? 50 : 0)
                 + (this.hasSkill('w5') ? Math.floor((CFG.BASE_HP + this.vit * CFG.HP_PER_VIT) * (this.skills['w5'] >= 2 ? 0.4 : 0.2)) : 0);
    this.maxEp = 50 + this.intl * CFG.EP_PER_INT;
    this.critChance = 0.05 + (this.hasSkill('r5') ? this.skills['r5'] * 0.10 : 0);
  }

  addXP(amount, game) {
    this.xp += amount;
    while (this.xp >= this.xpNext) {
      this.xp     -= this.xpNext;
      this.level  += 1;
      this.xpNext  = Math.floor(100 * Math.pow(1.35, this.level - 1));
      this.freePoints  += 3;
      this.skillPoints += 1;
      this.hp = this.maxHp; // full heal on level up
      this.ep = this.maxEp;
      game.ui.showLevelUp(this.level, this.freePoints, this.skillPoints);
      game.audio.playSound('assets/audio/sounds/levelup.wav', 0.8);
    }
  }

  gainGold(amount) { this.gold += amount; }

  hasItem(id) { return this.inventory.some(i => i.itemId === id && i.qty > 0); }
  countItem(id) { const s = this.inventory.find(i => i.itemId === id); return s ? s.qty : 0; }

  addItem(id, qty = 1) {
    const existing = this.inventory.find(i => i.itemId === id);
    if (existing) { existing.qty += qty; return true; }
    if (this.inventory.length >= CFG.ITEMS_MAX) return false;
    this.inventory.push({ itemId: id, qty });
    return true;
  }

  removeItem(id, qty = 1) {
    const s = this.inventory.find(i => i.itemId === id);
    if (!s || s.qty < qty) return false;
    s.qty -= qty;
    if (s.qty <= 0) this.inventory = this.inventory.filter(i => i.itemId !== id);
    return true;
  }

  useHeal(game) {
    const healItems = ['med_5','med_4','med_3','med_7','med_2','med_6','med_1'];
    for (const id of healItems) {
      if (this.hasItem(id)) {
        const def = ITEMS_DB[id];
        this.hp = Math.min(this.maxHp, this.hp + def.heal);
        this.removeItem(id);
        game.ui.spawnDamageNum(this.x + 14, this.y, '+' + Math.min(def.heal, this.maxHp - (this.hp - def.heal)), 'heal');
        game.audio.playSound('assets/audio/sounds/pickup.wav', 0.6);
        return;
      }
    }
  }

  equip(itemId) {
    const def = ITEMS_DB[itemId];
    if (!def) return;
    if (def.type === 'weapon') this.equipped.weapon = itemId;
    if (def.type === 'armor')  this.equipped.armor  = itemId;
    this.computeMaxStats();
    return true;
  }

  hasSkill(id) { return (this.skills[id] || 0) > 0; }
  skillLevel(id) { return this.skills[id] || 0; }

  unlockSkill(id, game) {
    const allSkills = [...Object.values(SKILLS_DATA).flat()];
    const def = allSkills.find(s => s.id === id);
    if (!def) return;
    if (this.skillPoints < def.cost) return;
    if (def.requires && !this.hasSkill(def.requires)) return;
    const cur = this.skillLevel(id);
    if (cur >= def.maxLv) return;
    this.skills[id] = cur + 1;
    this.skillPoints -= def.cost;
    this.computeMaxStats();
    game.audio.playSound('assets/audio/sounds/equip.wav', 0.7);
    game.ui.renderSkillTree(this);
    // Auto-equip as active skill if slot open
    if (!this.activeSkill1) this.activeSkill1 = id;
    else if (!this.activeSkill2 && this.activeSkill2 !== id) this.activeSkill2 = id;
  }

  useSkill(slot, game) {
    const id = slot === 1 ? this.activeSkill1 : this.activeSkill2;
    if (!id) return;
    const def = [...Object.values(SKILLS_DATA).flat()].find(s => s.id === id);
    if (!def) return;
    const cd = slot === 1 ? this.skill1Cd : this.skill2Cd;
    if (cd > 0) return;
    if (this.ep < def.epCost) return;
    this.ep -= def.epCost;
    if (slot === 1) this.skill1Cd = def.cdSec * 60;
    else            this.skill2Cd = def.cdSec * 60;
    this._applySkillEffect(id, def, game);
    game.audio.playSound('assets/audio/sounds/laser.wav', 0.5);
  }

  _applySkillEffect(id, def, game) {
    const lv = this.skillLevel(id);
    switch(id) {
      case 'w1': // Iron Strike
        game.meleeAttack(this, def.epCost, [1.2, 1.5, 2.0][lv-1], true);
        break;
      case 'w2': // Whirlwind
        game.aoeAttack(this, 120, this.totalAtk * 1.5);
        break;
      case 'w3': // Berserker
        this.berserk = [8,8,8][lv-1] * 60;
        game.ui.addFloatText('BERSERKER!', this.x, this.y, '#ff4400');
        break;
      case 'w4': // Ground Slam
        game.aoeAttack(this, 80, this.totalAtk, true);
        break;
      case 'r1': // Quick Shot — burst
        game.rangedAttack(this, 3, 150);
        break;
      case 'r3': // Shadow Step
        this.x += this.facing * 200;
        this.invincible = 30;
        game.ui.addFloatText('DASH!', this.x, this.y, '#00ffff');
        break;
      case 'r6': // Death Rain
        game.rangedAttack(this, 12, 80);
        break;
      case 't1': // EMP Pulse
        game.empAllEnemies([1000, 1500, 2000][lv-1]);
        game.audio.playSound('assets/audio/sounds/blaster.wav', 0.7);
        break;
      case 't2': // Shield Drone
        this.shieldHp += [30, 60, 90][lv-1];
        game.ui.addFloatText('SHIELD: ' + this.shieldHp, this.x, this.y, '#4488ff');
        break;
      case 't3': // Nanobots
        this.regenTimer = [5,5,5][lv-1] * 60;
        this.regenRate  = [5,10,15][lv-1];
        game.ui.addFloatText('REGEN ACTIVE', this.x, this.y, '#00ff88');
        break;
      case 't5': // Overclock
        this.speedBoost = [6,6][lv-1] * 60;
        game.ui.addFloatText('OVERCLOCK!', this.x, this.y, '#ffff00');
        break;
      case 't6': // Nuke Drone
        game.aoeAttack(this, 400, this.totalAtk * 5);
        game.screen.flash('#ff6600', 0.6);
        game.audio.playSound('assets/audio/sounds/blaster.wav', 1.0);
        break;
      default: break;
    }
  }

  save() {
    return {
      name: this.name, level: this.level, xp: this.xp, xpNext: this.xpNext,
      freePoints: this.freePoints, skillPoints: this.skillPoints,
      str: this.str, agi: this.agi, intl: this.intl, vit: this.vit,
      maxHp: this.maxHp, hp: this.hp, maxEp: this.maxEp, ep: this.ep,
      gold: this.gold, kills: this.kills, critChance: this.critChance,
      equipped: this.equipped, inventory: this.inventory,
      skills: this.skills, activeSkill1: this.activeSkill1, activeSkill2: this.activeSkill2,
      checkpoints: this.checkpoints, currentZone: this.currentZone,
      deathCount: this.deathCount, playTime: this.playTime,
    };
  }
}

// ============================================================
// CAMERA
// ============================================================
class Camera {
  constructor(cw, ch) {
    this.x = 0; this.y = 0;
    this.cw = cw; this.ch = ch;
    this.shake = 0;
    this.shakeX = 0; this.shakeY = 0;
  }

  follow(target, world) {
    const tx = target.x + target.w / 2 - this.cw / 2;
    const ty = target.y + target.h / 2 - this.ch / 2;
    this.x = U.lerp(this.x, tx, 0.12);
    this.y = U.lerp(this.y, ty, 0.10);
    this.x = U.clamp(this.x, 0, Math.max(0, world.W - this.cw));
    this.y = U.clamp(this.y, 0, Math.max(0, world.H - this.ch));
    if (this.shake > 0) {
      this.shakeX = U.rand(-this.shake, this.shake);
      this.shakeY = U.rand(-this.shake, this.shake);
      this.shake *= 0.85;
      if (this.shake < 0.5) this.shake = 0;
    } else { this.shakeX = 0; this.shakeY = 0; }
  }

  addShake(amount) { this.shake = Math.max(this.shake, amount); }

  toScreen(wx, wy) {
    return { x: wx - this.x + this.shakeX, y: wy - this.y + this.shakeY };
  }
}

// ============================================================
// RENDERER
// ============================================================
class Renderer {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx    = canvas.getContext('2d');
    this.W      = CFG.CANVAS_W;
    this.H      = CFG.CANVAS_H;
    this.canvas.width  = this.W;
    this.canvas.height = this.H;
    this.images = {};
    this.flashAlpha = 0;
    this.flashColor = '#fff';
    this.bgScrollX  = 0;
  }

  loadImage(src) {
    if (this.images[src]) return this.images[src];
    const img = new Image();
    img.src = src;
    this.images[src] = img;
    return img;
  }

  preload(srcs) {
    return Promise.all(srcs.map(s => new Promise(res => {
      const img = this.loadImage(s);
      if (img.complete) res();
      else { img.onload = res; img.onerror = res; }
    })));
  }

  flash(color, alpha) { this.flashColor = color; this.flashAlpha = alpha; }

  clear(color = '#000') {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(0, 0, this.W, this.H);
  }

  drawBackground(zone, cam, scrollFactor = 0.3) {
    const bg = this.loadImage(zone.bg);
    if (!bg.complete) return;
    const bx = -(cam.x * scrollFactor) % bg.width;
    this.ctx.drawImage(bg, bx, 0, bg.width, this.H);
    if (bx + bg.width < this.W) this.ctx.drawImage(bg, bx + bg.width, 0, bg.width, this.H);
    // fog overlay
    this.ctx.fillStyle = zone.fog;
    this.ctx.fillRect(0, 0, this.W, this.H);
  }

  drawWorld(world, cam) {
    const ctx = this.ctx;
    const T = CFG.TILE;
    const zone = world.zoneDef;

    // Ground tiles (visible only)
    const startTX = Math.max(0, Math.floor(cam.x / T) - 1);
    const endTX   = Math.min(world.W / T, Math.ceil((cam.x + this.W) / T) + 1);
    const startTY = Math.max(0, Math.floor(cam.y / T) - 1);
    const endTY   = Math.min(world.H / T, Math.ceil((cam.y + this.H) / T) + 1);

    for (let ty = startTY; ty < endTY; ty++) {
      for (let tx = startTX; tx < endTX; tx++) {
        if (world.tiles[ty]?.[tx]) {
          const sp = cam.toScreen(tx * T, ty * T);
          // Top layer = lighter
          if (!world.tiles[ty-1]?.[tx]) {
            ctx.fillStyle = zone.ground;
            ctx.fillRect(sp.x, sp.y, T, T);
            ctx.fillStyle = 'rgba(255,255,255,0.1)';
            ctx.fillRect(sp.x, sp.y, T, 3);
          } else {
            ctx.fillStyle = this._darken(zone.ground, 0.7);
            ctx.fillRect(sp.x, sp.y, T, T);
          }
          // Grid lines subtle
          ctx.strokeStyle = 'rgba(0,0,0,0.15)';
          ctx.lineWidth = 0.5;
          ctx.strokeRect(sp.x, sp.y, T, T);
        }
      }
    }

    // Platforms
    for (const p of world.platforms) {
      const sp = cam.toScreen(p.x, p.y);
      if (sp.x > -p.w && sp.x < this.W && sp.y > -T && sp.y < this.H) {
        ctx.fillStyle = zone.platform;
        ctx.fillRect(sp.x, sp.y, p.w, T);
        ctx.fillStyle = 'rgba(255,255,255,0.15)';
        ctx.fillRect(sp.x, sp.y, p.w, 3);
        // Edge glow
        ctx.fillStyle = 'rgba(255,200,0,0.06)';
        ctx.fillRect(sp.x, sp.y, p.w, T);
      }
    }
  }

  drawLoot(loot, cam) {
    const ctx = this.ctx;
    for (const item of loot) {
      if (item.taken) continue;
      const sp = cam.toScreen(item.x, item.y);
      if (sp.x < -64 || sp.x > this.W + 64) continue;
      const def  = ITEMS_DB[item.itemId];
      if (!def) continue;
      // Glow
      const glow = 0.5 + 0.5 * Math.sin(Date.now() * 0.004);
      ctx.shadowBlur = 12 * glow;
      ctx.shadowColor = this._rarityColor(def.rarity);
      const img = this.loadImage(def.icon);
      ctx.drawImage(img, sp.x - 14, sp.y - 14, 28, 28);
      ctx.shadowBlur = 0;
    }
  }

  drawEnemies(enemies, cam) {
    const ctx = this.ctx;
    for (const e of enemies) {
      if (!e.alive) continue;
      const sp = cam.toScreen(e.x, e.y);
      if (sp.x < -e.size * 2 || sp.x > this.W + e.size * 2) continue;
      this._drawEnemy(ctx, e, sp);
    }
  }

  _drawEnemy(ctx, e, sp) {
    const s = e.size;
    const flash = e.hitFlash > 0;

    ctx.save();
    if (e.facing === -1) {
      ctx.translate(sp.x + s / 2, sp.y + s / 2);
      ctx.scale(-1, 1);
      ctx.translate(-(sp.x + s / 2), -(sp.y + s / 2));
    }

    if (flash) {
      ctx.globalCompositeOperation = 'source-over';
      ctx.filter = 'brightness(3) saturate(0)';
    }

    // Draw body based on type
    const c = e.color;
    ctx.fillStyle = c;
    if (e.boss) {
      // Boss: bigger with glow
      ctx.shadowBlur = 20;
      ctx.shadowColor = c;
      ctx.fillRect(sp.x, sp.y, s, s);
      ctx.fillStyle = 'rgba(255,255,255,0.2)';
      ctx.fillRect(sp.x + s*0.1, sp.y + s*0.05, s*0.8, s*0.25);
      // Boss eyes
      ctx.fillStyle = '#ff0000';
      ctx.fillRect(sp.x + s*0.2, sp.y + s*0.3, s*0.15, s*0.12);
      ctx.fillRect(sp.x + s*0.65, sp.y + s*0.3, s*0.15, s*0.12);
      ctx.shadowBlur = 0;
    } else {
      // Normal enemy silhouette
      ctx.fillRect(sp.x + s*0.1, sp.y + s*0.1, s*0.8, s*0.9); // body
      ctx.fillStyle = this._lighten(c, 1.3);
      ctx.fillRect(sp.x + s*0.2, sp.y + s*0.05, s*0.6, s*0.35); // head
      // Eyes
      ctx.fillStyle = '#ffff00';
      ctx.fillRect(sp.x + s*0.3, sp.y + s*0.15, s*0.12, s*0.1);
      ctx.fillRect(sp.x + s*0.58, sp.y + s*0.15, s*0.12, s*0.1);
    }

    ctx.filter = 'none';
    ctx.restore();

    // HP bar above
    const barW = s + 10;
    const barH = 5;
    const bx = sp.x - 5;
    const by = sp.y - 12;
    ctx.fillStyle = '#220000';
    ctx.fillRect(bx, by, barW, barH);
    const pct = e.hp / e.maxHp;
    ctx.fillStyle = pct > 0.5 ? '#00cc44' : pct > 0.25 ? '#ffaa00' : '#ff2200';
    ctx.fillRect(bx, by, barW * pct, barH);

    if (e.boss) {
      ctx.fillStyle = '#fff';
      ctx.font = `bold 11px 'Share Tech Mono'`;
      ctx.textAlign = 'center';
      ctx.fillText(e.name, sp.x + s/2, by - 4);
    }

    if (e.stunned > 0) {
      ctx.fillStyle = '#ffff00';
      ctx.font = '14px serif';
      ctx.textAlign = 'center';
      ctx.fillText('★', sp.x + s/2, sp.y - 16);
    }
  }

  drawPlayer(player, cam) {
    const ctx = this.ctx;
    const sp  = cam.toScreen(player.x, player.y);
    const w = player.w, h = player.h;

    if (player.invincible > 0 && Math.floor(player.invincible / 4) % 2 === 0) return;

    ctx.save();
    if (player.facing === -1) {
      ctx.translate(sp.x + w/2, sp.y);
      ctx.scale(-1, 1);
      ctx.translate(-(sp.x + w/2), -sp.y);
    }

    // Body
    const berserk = player.berserk > 0;
    ctx.shadowBlur  = berserk ? 15 : (player.shieldHp > 0 ? 12 : 0);
    ctx.shadowColor = berserk ? '#ff4400' : '#4488ff';

    // Legs
    const legAnim = Math.sin(player.animTimer * 0.2) * (player.state === 'walk' ? 5 : 0);
    ctx.fillStyle = '#3a3a5a';
    ctx.fillRect(sp.x + 4, sp.y + h*0.55, w*0.36, h*0.45);
    ctx.fillRect(sp.x + w*0.52, sp.y + h*0.55, w*0.36, h*0.45);

    // Torso
    ctx.fillStyle = berserk ? '#8B0000' : '#4a6080';
    ctx.fillRect(sp.x + 2, sp.y + h*0.3, w - 4, h*0.32);

    // Armor glow
    if (player.shieldHp > 0) {
      ctx.fillStyle = 'rgba(68,136,255,0.3)';
      ctx.fillRect(sp.x, sp.y + h*0.3, w, h*0.32);
    }

    // Head
    ctx.fillStyle = '#c8a87a';
    ctx.fillRect(sp.x + 5, sp.y + h*0.06, w - 10, h*0.25);
    // Helmet
    ctx.fillStyle = '#334466';
    ctx.fillRect(sp.x + 4, sp.y + h*0.03, w - 8, h*0.14);
    // Eye slot
    ctx.fillStyle = berserk ? '#ff4400' : '#80ccff';
    ctx.fillRect(sp.x + w*0.55, sp.y + h*0.1, w*0.22, h*0.06);

    // Weapon (right hand)
    const wDef = player.weaponDef;
    if (wDef) {
      const wImg = this.loadImage(wDef.icon);
      const atkAnim = player.isAttacking ? Math.sin(player.stateTimer * 0.5) * 15 : 0;
      ctx.save();
      ctx.translate(sp.x + w, sp.y + h * 0.4);
      ctx.rotate((atkAnim * Math.PI) / 180);
      ctx.drawImage(wImg, 0, -12, 28, 28);
      ctx.restore();
    }

    ctx.shadowBlur = 0;
    ctx.restore();

    // Attack hitbox visual
    if (player.attackBox && player.isAttacking) {
      const abSp = cam.toScreen(player.attackBox.x, player.attackBox.y);
      ctx.strokeStyle = 'rgba(255,200,0,0.4)';
      ctx.lineWidth = 2;
      ctx.strokeRect(abSp.x, abSp.y, player.attackBox.w, player.attackBox.h);
    }
  }

  drawExitPortal(world, cam) {
    const sp = cam.toScreen(world.exitX, world.exitY);
    const t  = Date.now() * 0.001;
    this.ctx.save();
    this.ctx.globalAlpha = 0.8 + 0.2 * Math.sin(t * 2);
    this.ctx.shadowBlur  = 30 + 10 * Math.sin(t * 3);
    this.ctx.shadowColor = '#00ffcc';
    this.ctx.strokeStyle = '#00ffcc';
    this.ctx.lineWidth   = 3;
    this.ctx.beginPath();
    this.ctx.arc(sp.x + 20, sp.y + 24, 28, 0, Math.PI * 2);
    this.ctx.stroke();
    this.ctx.fillStyle = 'rgba(0,255,200,0.15)';
    this.ctx.fill();
    this.ctx.fillStyle = '#00ffcc';
    this.ctx.font = '10px Share Tech Mono';
    this.ctx.textAlign = 'center';
    this.ctx.fillText('NEXT ZONE ▶', sp.x + 20, sp.y + 65);
    this.ctx.restore();
  }

  applyFlash() {
    if (this.flashAlpha <= 0) return;
    this.ctx.fillStyle = this.flashColor;
    this.ctx.globalAlpha = this.flashAlpha;
    this.ctx.fillRect(0, 0, this.W, this.H);
    this.ctx.globalAlpha = 1;
    this.flashAlpha *= 0.85;
    if (this.flashAlpha < 0.01) this.flashAlpha = 0;
  }

  _darken(hex, f) {
    const [r,g,b] = this._parseHex(hex);
    return `rgb(${Math.floor(r*f)},${Math.floor(g*f)},${Math.floor(b*f)})`;
  }
  _lighten(hex, f) { return this._darken(hex, f); }
  _parseHex(hex) {
    const h = hex.replace('#','');
    return [parseInt(h.slice(0,2),16), parseInt(h.slice(2,4),16), parseInt(h.slice(4,6),16)];
  }
  _rarityColor(r) {
    return { common:'#aaaaaa', uncommon:'#1abc9c', rare:'#2980b9', epic:'#8e44ad', legendary:'#f39c12' }[r] || '#fff';
  }
}

// ============================================================
// INPUT
// ============================================================
class Input {
  constructor() {
    this.keys = {};
    this.justPressed = {};
    window.addEventListener('keydown', e => {
      if (!this.keys[e.code]) this.justPressed[e.code] = true;
      this.keys[e.code] = true;
      e.preventDefault();
    });
    window.addEventListener('keyup', e => { this.keys[e.code] = false; });
  }
  is(code) { return !!this.keys[code]; }
  pressed(code) { return !!this.justPressed[code]; }
  flush() { this.justPressed = {}; }
  move() {
    const l = this.is('ArrowLeft')  || this.is('KeyA');
    const r = this.is('ArrowRight') || this.is('KeyD');
    return l ? -1 : (r ? 1 : 0);
  }
  jump()    { return this.is('Space') || this.is('ArrowUp') || this.is('KeyW'); }
  attack()  { return this.pressed('KeyZ') || this.pressed('Space'); }
  skill1()  { return this.pressed('KeyX') || this.pressed('ShiftLeft'); }
  skill2()  { return this.pressed('KeyC'); }
  heal()    { return this.pressed('KeyH'); }
  interact(){ return this.pressed('KeyE'); }
  inv()     { return this.pressed('KeyI'); }
  skills()  { return this.pressed('KeyK'); }
  pause()   { return this.pressed('Escape'); }
}

// ============================================================
// UI MANAGER
// ============================================================
class UI {
  constructor(game) {
    this.game = game;
    this._currentPanel = null;
    this._tooltip = document.getElementById('item-tooltip');
    this._bindButtons();
  }

  _bindButtons() {
    const g = this.game;
    document.getElementById('btn-resume').onclick   = () => g.togglePause();
    document.getElementById('btn-open-inv').onclick = () => this.openPanel('inventory');
    document.getElementById('btn-open-skills').onclick = () => this.openPanel('skills');
    document.getElementById('btn-open-stats').onclick  = () => this.openPanel('stats');
    document.getElementById('btn-quit').onclick     = () => g.quitToMenu();
    document.getElementById('btn-levelup-ok').onclick  = () => this._hide('levelup-overlay');
    document.getElementById('btn-loot-take').onclick   = () => g.takeLoot();
    document.getElementById('btn-loot-skip').onclick   = () => this._hide('loot-popup');
    document.getElementById('btn-respawn').onclick   = () => g.respawn();
    document.getElementById('btn-go-menu').onclick   = () => g.quitToMenu();
    document.getElementById('btn-clear-log')?.onclick = () => {};

    // Close panel buttons
    document.querySelectorAll('.close-btn').forEach(btn => {
      btn.addEventListener('click', () => { this.closePanel(btn.dataset.panel); });
    });

    // Skill tabs
    document.querySelectorAll('.skill-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.skill-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        if (g.player) this.renderSkillTree(g.player, tab.dataset.branch);
      });
    });
  }

  _show(id) { document.getElementById(id)?.classList.remove('hidden'); }
  _hide(id) { document.getElementById(id)?.classList.add('hidden'); }

  openPanel(name) {
    const ids = ['panel-inventory','panel-skills','panel-stats'];
    ids.forEach(id => document.getElementById(id)?.classList.add('hidden'));
    const el = document.getElementById('panel-' + name);
    if (!el) return;
    el.classList.remove('hidden');
    this._currentPanel = name;
    if (name === 'inventory') this.renderInventory(this.game.player);
    if (name === 'skills')    this.renderSkillTree(this.game.player);
    if (name === 'stats')     this.renderStats(this.game.player);
  }

  closePanel(name) {
    document.getElementById('panel-' + name)?.classList.add('hidden');
    this._currentPanel = null;
  }

  anyPanelOpen() {
    return ['inventory','skills','stats'].some(n => !document.getElementById('panel-'+n)?.classList.contains('hidden'));
  }

  updateHUD(player, world) {
    const pct = (v, max) => Math.round(U.clamp(v / max * 100, 0, 100)) + '%';
    document.getElementById('bar-hp').style.width = pct(player.hp, player.maxHp);
    document.getElementById('bar-ep').style.width = pct(player.ep, player.maxEp);
    document.getElementById('bar-xp').style.width = pct(player.xp, player.xpNext);
    document.getElementById('hp-text').textContent = `${Math.ceil(player.hp)}/${player.maxHp}`;
    document.getElementById('ep-text').textContent = `${Math.ceil(player.ep)}/${player.maxEp}`;
    document.getElementById('xp-text').textContent = `${player.xp}/${player.xpNext}`;
    document.getElementById('hud-lv').textContent  = player.level;
    document.getElementById('coin-count').textContent = player.gold;
    document.getElementById('kill-count').textContent = player.kills;
    if (world) document.getElementById('zone-name').textContent = `ZONE ${world.zoneId + 1} — ${world.zoneDef.name.toUpperCase()}`;

    // Weapon icon
    const wDef = player.weaponDef;
    const wIcon = document.getElementById('hud-weapon-icon');
    const wName = document.getElementById('hud-weapon-name');
    if (wDef) { wIcon.src = wDef.icon; wName.textContent = wDef.name; }

    // Heal count
    const healItems = ['med_5','med_4','med_3','med_7','med_2','med_6','med_1'];
    let healCount = 0;
    for (const id of healItems) healCount += player.countItem(id);
    document.getElementById('heal-count').textContent = healCount;

    // Hotbar skill icons
    const s1 = player.activeSkill1 ? [...Object.values(SKILLS_DATA).flat()].find(s=>s.id===player.activeSkill1) : null;
    const s2 = player.activeSkill2 ? [...Object.values(SKILLS_DATA).flat()].find(s=>s.id===player.activeSkill2) : null;
    const si1 = document.getElementById('hotbar-skill1-icon');
    const si2 = document.getElementById('hotbar-skill2-icon');
    if (s1 && si1) si1.src = s1.icon;
    if (s2 && si2) si2.src = s2.icon;

    // Cooldown overlays
    if (s1) {
      const cd1 = document.getElementById('cd-skill1');
      cd1.style.transform = `scaleY(${U.clamp(player.skill1Cd / (s1.cdSec * 60), 0, 1)})`;
    }
    if (s2) {
      const cd2 = document.getElementById('cd-skill2');
      cd2.style.transform = `scaleY(${U.clamp(player.skill2Cd / (s2.cdSec * 60), 0, 1)})`;
    }
  }

  renderInventory(player) {
    if (!player) return;
    // Equipped
    const wDef = player.weaponDef;
    const aDef = player.armorDef;
    const wImg = document.getElementById('eq-weapon-img');
    const aImg = document.getElementById('eq-armor-img');
    if (wDef) { wImg.src = wDef.icon; document.getElementById('eq-weapon-name').textContent = wDef.name; }
    else { wImg.src = ''; document.getElementById('eq-weapon-name').textContent = '–'; }
    if (aDef) { aImg.src = aDef.icon; document.getElementById('eq-armor-name').textContent = aDef.name; }
    else { aImg.src = ''; document.getElementById('eq-armor-name').textContent = '–'; }

    // Stats summary
    document.getElementById('inv-stats-summary').innerHTML =
      `ATK: <b>${player.totalAtk}</b> | DEF: <b>${player.totalDef}</b> | SPD: <b>${player.moveSpeed.toFixed(1)}</b> | CRIT: <b>${Math.round(player.critChance*100)}%</b>`;

    // Bag
    const grid = document.getElementById('inv-grid');
    grid.innerHTML = '';
    document.getElementById('inv-bag-count').textContent = `(${player.inventory.length}/${CFG.ITEMS_MAX})`;

    player.inventory.forEach(({ itemId, qty }) => {
      const def = ITEMS_DB[itemId]; if (!def) return;
      const cell = document.createElement('div');
      cell.className = `inv-item rarity-${def.rarity}`;
      const equipped = player.equipped.weapon === itemId || player.equipped.armor === itemId;
      if (equipped) cell.classList.add('equipped');
      const img = document.createElement('img');
      img.src = def.icon;
      cell.appendChild(img);
      if (qty > 1) { const q = document.createElement('span'); q.className='item-qty'; q.textContent=qty; cell.appendChild(q); }

      cell.addEventListener('click', () => {
        if (def.type === 'weapon' || def.type === 'armor') {
          player.equip(itemId);
          this.game.audio.playSound('assets/audio/sounds/equip.wav', 0.6);
          this.renderInventory(player);
        } else if (def.type === 'consumable') {
          player.hp = Math.min(player.maxHp, player.hp + def.heal);
          player.removeItem(itemId);
          this.game.audio.playSound('assets/audio/sounds/pickup.wav', 0.5);
          this.renderInventory(player);
        }
      });

      cell.addEventListener('mouseenter', e => this.showTooltip(def, e));
      cell.addEventListener('mouseleave',   () => this.hideTooltip());
      grid.appendChild(cell);
    });
  }

  renderSkillTree(player, branch = null) {
    if (!player) return;
    const activeBranch = branch || document.querySelector('.skill-tab.active')?.dataset.branch || 'warrior';
    document.getElementById('sp-count').textContent = player.skillPoints;
    const list = SKILLS_DATA[activeBranch] || [];
    const grid = document.getElementById('skill-tree-grid');
    grid.innerHTML = '';
    list.forEach(sk => {
      const lv  = player.skillLevel(sk.id);
      const req = sk.requires ? player.hasSkill(sk.requires) : true;
      const maxed = lv >= sk.maxLv;
      const locked = !req;
      const card = document.createElement('div');
      card.className = `skill-card ${lv > 0 ? (maxed ? 'maxed' : 'unlocked') : (locked ? 'locked' : '')}`;
      const pips = Array.from({length: sk.maxLv}, (_,i) => `<div class="skill-pip ${i < lv ? 'filled' : ''}"></div>`).join('');
      card.innerHTML = `
        <div class="skill-card-icon"><img src="${sk.icon}" alt="${sk.name}"/></div>
        <div class="skill-card-info">
          <div class="skill-card-name">${sk.name} ${lv > 0 ? `(Lv.${lv})` : ''}</div>
          <div class="skill-card-desc">${sk.desc}</div>
          <div class="skill-card-levels">${pips}</div>
          ${sk.epCost > 0 ? `<div style="font-size:10px;color:#2980b9;margin-bottom:4px">EP: ${sk.epCost} | CD: ${sk.cdSec}s</div>` : ''}
          ${!maxed ? `<button class="btn-skill-unlock" data-sid="${sk.id}" ${(locked || player.skillPoints < sk.cost) ? 'disabled' : ''}>
            ${locked ? '🔒 LOCKED' : (player.skillPoints < sk.cost ? `${sk.cost} SP needed` : `UNLOCK (${sk.cost} SP)`)}
          </button>` : '<div style="color:var(--gold);font-size:10px">✓ MAXED</div>'}
        </div>
      `;
      card.querySelector('.btn-skill-unlock')?.addEventListener('click', () => {
        player.unlockSkill(sk.id, this.game);
        this.renderSkillTree(player, activeBranch);
      });
      grid.appendChild(card);
    });
  }

  renderStats(player) {
    if (!player) return;
    document.getElementById('char-name-display').textContent = player.name;
    document.getElementById('free-points').textContent = player.freePoints;
    const rows = document.getElementById('stat-rows');
    rows.innerHTML = '';
    const stats = [
      { key:'str',  label:'STR — Strength',    desc:'+1.5 attack per point' },
      { key:'agi',  label:'AGI — Agility',      desc:'+0.08 speed per point' },
      { key:'intl', label:'INT — Intelligence', desc:'+10 max EP per point' },
      { key:'vit',  label:'VIT — Vitality',     desc:'+20 max HP per point' },
    ];
    stats.forEach(({ key, label, desc }) => {
      const row = document.createElement('div');
      row.className = 'stat-row';
      row.innerHTML = `
        <span class="stat-row-name">${label}</span>
        <span class="stat-row-val">${player[key]}</span>
        <span class="stat-row-desc">${desc}</span>
        <button class="btn-stat-plus" data-stat="${key}" ${player.freePoints <= 0 ? 'disabled' : ''}>+</button>
      `;
      row.querySelector('.btn-stat-plus').addEventListener('click', () => {
        if (player.freePoints <= 0) return;
        player[key]++;
        player.freePoints--;
        player.computeMaxStats();
        this.renderStats(player);
      });
      rows.appendChild(row);
    });
    document.getElementById('stat-derived').innerHTML = `
      Max HP: <b>${player.maxHp}</b> &nbsp;|&nbsp; Max EP: <b>${player.maxEp}</b><br>
      Attack: <b>${player.totalAtk}</b> &nbsp;|&nbsp; Defense: <b>${player.totalDef}</b><br>
      Speed: <b>${player.moveSpeed.toFixed(1)}</b> &nbsp;|&nbsp; Crit: <b>${Math.round(player.critChance*100)}%</b><br>
      Kills: <b>${player.kills}</b> &nbsp;|&nbsp; Gold: <b>${player.gold}</b>
    `;
  }

  showLevelUp(level, freePoints, skillPoints) {
    document.getElementById('levelup-info').innerHTML =
      `<b style="color:var(--gold-l)">LEVEL ${level}</b><br><br>
       +3 Stat Points (Free Points: ${freePoints})<br>
       +1 Skill Point (Total: ${skillPoints})`;
    this._show('levelup-overlay');
  }

  showLoot(lootItem) {
    const def = ITEMS_DB[lootItem.itemId]; if (!def) return;
    document.getElementById('loot-title').textContent = `FOUND: ${def.rarity.toUpperCase()}`;
    document.getElementById('loot-title').style.color = this._rarityColor(def.rarity);
    document.getElementById('loot-item-display').innerHTML = `
      <img src="${def.icon}" alt="${def.name}" style="width:64px;height:64px"/>
      <div class="loot-item-info">
        <div class="loot-item-name">${def.name}</div>
        <div class="loot-item-stats">${this._itemStatsStr(def)}</div>
      </div>`;
    this._show('loot-popup');
  }

  showTooltip(def, e) {
    const tt = this._tooltip;
    tt.innerHTML = `
      <div class="tt-name" style="color:${this._rarityColor(def.rarity)}">${def.name}</div>
      <div class="tt-type">${def.type.toUpperCase()}${def.sub ? ' · ' + def.sub.toUpperCase() : ''} · ${def.rarity.toUpperCase()}</div>
      <div class="tt-stat">${this._itemStatsStr(def)}</div>
      ${def.desc ? `<div class="tt-desc">${def.desc}</div>` : ''}
    `;
    tt.style.left = (e.pageX + 12) + 'px';
    tt.style.top  = (e.pageY - 20) + 'px';
    tt.classList.remove('hidden');
  }

  hideTooltip() { this._tooltip.classList.add('hidden'); }

  _itemStatsStr(def) {
    if (def.type === 'weapon')     return `ATK: +${def.atk} | SPD: ×${def.spd}${def.range ? ' | RANGE: ' + def.range : ''}`;
    if (def.type === 'armor')      return `DEF: +${def.def}`;
    if (def.type === 'consumable') return `HEAL: +${def.heal === 9999 ? 'ALL HP' : def.heal}`;
    return '';
  }

  _rarityColor(r) {
    return { common:'#aaa', uncommon:'#1abc9c', rare:'#2980b9', epic:'#8e44ad', legendary:'#f39c12' }[r] || '#fff';
  }

  spawnDamageNum(wx, wy, text, type) {
    const cam = this.game.camera;
    if (!cam) return;
    const sp = cam.toScreen(wx, wy);
    const container = document.getElementById('damage-numbers');
    const el = document.createElement('div');
    el.className = `dmg-number ${type}`;
    el.textContent = text;
    el.style.left = sp.x + 'px';
    el.style.top  = sp.y + 'px';
    container.appendChild(el);
    setTimeout(() => el.remove(), 1000);
  }

  addFloatText(text, wx, wy, color = '#fff') {
    const cam = this.game.camera;
    if (!cam) return;
    const sp = cam.toScreen(wx, wy);
    const container = document.getElementById('damage-numbers');
    const el = document.createElement('div');
    el.className = 'dmg-number';
    el.style.color = color;
    el.style.fontSize = '14px';
    el.textContent = text;
    el.style.left = sp.x + 'px';
    el.style.top  = (sp.y - 20) + 'px';
    container.appendChild(el);
    setTimeout(() => el.remove(), 1200);
  }

  showInteractHint(v) {
    const el = document.getElementById('interact-hint');
    if (v) el.classList.remove('hidden');
    else   el.classList.add('hidden');
  }

  updateMinimap(world, player, enemies, cam) {
    const mc  = document.getElementById('minimap-canvas');
    const mctx = mc.getContext('2d');
    const mw = mc.width, mh = mc.height;
    const scaleX = mw / world.W;
    const scaleY = mh / world.H;

    mctx.fillStyle = '#0a0a0f';
    mctx.fillRect(0, 0, mw, mh);

    // Ground
    mctx.fillStyle = world.zoneDef.ground;
    mctx.fillRect(0, mh * 0.7, mw, mh * 0.3);

    // Platforms
    mctx.fillStyle = world.zoneDef.platform;
    for (const p of world.platforms) {
      mctx.fillRect(p.x * scaleX, p.y * scaleY, p.w * scaleX, 3);
    }

    // Enemies
    for (const e of world.enemies) {
      if (!e.alive) continue;
      mctx.fillStyle = e.boss ? '#ff0000' : '#ff5533';
      mctx.fillRect(e.x * scaleX - 1.5, e.y * scaleY - 1.5, 3, 3);
    }

    // Loot
    mctx.fillStyle = '#f1c40f';
    for (const l of world.loot) {
      if (!l.taken) mctx.fillRect(l.x * scaleX - 1, l.y * scaleY - 1, 2, 2);
    }

    // Exit
    mctx.fillStyle = '#00ffcc';
    mctx.fillRect(world.exitX * scaleX - 2, world.exitY * scaleY - 2, 5, 5);

    // Player
    mctx.fillStyle = '#ffffff';
    mctx.fillRect(player.x * scaleX - 3, player.y * scaleY - 3, 6, 6);

    // Viewport rect
    mctx.strokeStyle = 'rgba(255,255,255,0.2)';
    mctx.lineWidth = 1;
    mctx.strokeRect(cam.x * scaleX, cam.y * scaleY,
      CFG.CANVAS_W * scaleX, CFG.CANVAS_H * scaleY);
  }
}

// ============================================================
// MAIN GAME CLASS
// ============================================================
class Game {
  constructor() {
    this.canvas   = document.getElementById('game-canvas');
    this.screen   = new Renderer(this.canvas);
    this.audio    = new AudioMgr();
    this.input    = new Input();
    this.ui       = null;
    this.camera   = null;
    this.player   = null;
    this.world    = null;

    this.paused   = false;
    this.running  = false;
    this.lastTime = 0;
    this.raf      = null;

    this.pendingLoot = null;
    this.transitioning = false;

    this._loadImages = [];
    this._bindGlobalButtons();
    this._bindCanvasResize();
  }

  _bindGlobalButtons() {
    document.getElementById('btn-new-game').onclick = () => this.startNewGame();
    document.getElementById('btn-continue').onclick = () => this.continueGame();
    document.getElementById('btn-how').onclick      = () => this.showHowTo();
    document.getElementById('btn-howto-back').onclick = () => this.showTitle();
  }

  _bindCanvasResize() {
    const resize = () => {
      const vp = document.getElementById('game-viewport');
      if (!vp) return;
      const vw = vp.clientWidth, vh = vp.clientHeight;
      const scaleX = vw / CFG.CANVAS_W;
      const scaleY = vh / CFG.CANVAS_H;
      const scale  = Math.min(scaleX, scaleY);
      this.canvas.style.width  = CFG.CANVAS_W * scale + 'px';
      this.canvas.style.height = CFG.CANVAS_H * scale + 'px';
      this.canvas.style.margin = 'auto';
      this.canvas.style.display = 'block';
    };
    window.addEventListener('resize', resize);
    resize();
  }

  _showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(id)?.classList.add('active');
  }

  showTitle()  { this._showScreen('screen-title'); }
  showHowTo()  { this._showScreen('screen-howto'); }

  startNewGame() {
    localStorage.removeItem(CFG.SAVE_KEY);
    this.player = new Player(null);
    this.player.computeMaxStats();
    this._loadZone(0, true);
  }

  continueGame() {
    const save = this._loadSave();
    if (!save) { this.startNewGame(); return; }
    this.player = new Player(save.player);
    this.player.computeMaxStats();
    this._loadZone(save.player.currentZone || 0, false);
  }

  _loadSave() {
    try { return JSON.parse(localStorage.getItem(CFG.SAVE_KEY)); }
    catch(e) { return null; }
  }

  save() {
    if (!this.player) return;
    const data = { player: this.player.save(), version: 1 };
    localStorage.setItem(CFG.SAVE_KEY, JSON.stringify(data));
    this.ui?.addFloatText('SAVED', this.player.x, this.player.y - 30, '#00ffcc');
  }

  async _loadZone(zoneId, isNew) {
    this.transitioning = true;
    this._stopLoop();

    const trans = document.getElementById('area-transition');
    trans.classList.remove('hidden');
    trans.style.opacity = '1';

    // Generate world
    this.world  = WorldGen.generate(zoneId);
    this.camera = new Camera(CFG.CANVAS_W, CFG.CANVAS_H);

    if (!this.ui) this.ui = new UI(this);

    // Place player
    this.player.x = this.world.playerStart.x;
    this.player.y = this.world.playerStart.y;
    this.player.vx = 0; this.player.vy = 0;
    this.player.currentZone = zoneId;

    // Preload zone assets
    const imgs = [
      this.world.zoneDef.bg,
      ...Object.values(ITEMS_DB).map(d => d.icon),
      ...Object.values(SKILLS_DATA).flat().map(s => s.icon),
    ];
    await this.screen.preload(imgs.slice(0, 60)); // limit

    // Show game screen
    this._showScreen('screen-game');

    // Start music
    this.audio.playMusic(this.world.zoneDef.music);

    // Fade in
    await new Promise(r => setTimeout(r, 300));
    trans.style.opacity = '0';
    setTimeout(() => trans.classList.add('hidden'), 600);

    this.transitioning = false;
    this._startLoop();
  }

  _startLoop() {
    if (this.running) return;
    this.running = true;
    this.lastTime = performance.now();
    this.raf = requestAnimationFrame(t => this._loop(t));
  }

  _stopLoop() {
    this.running = false;
    if (this.raf) cancelAnimationFrame(this.raf);
  }

  _loop(timestamp) {
    if (!this.running) return;
    const dt = Math.min((timestamp - this.lastTime) / 1000, 0.05); // cap at 50ms
    this.lastTime = timestamp;

    if (!this.paused && !this.transitioning) {
      this.update(dt);
    }
    this.render();
    this.raf = requestAnimationFrame(t => this._loop(t));
  }

  // ============================================================
  // UPDATE
  // ============================================================
  update(dt) {
    const p = this.player;
    const w = this.world;
    const inp = this.input;
    if (!p || !w) return;

    p.playTime += dt;

    // Handle UI input first
    if (inp.pressed('Escape')) this.togglePause();
    if (inp.inv())    { this.ui.openPanel(this.ui._currentPanel === 'inventory' ? null : 'inventory'); if (!this.ui._currentPanel) this.ui.closePanel('inventory'); }
    if (inp.skills()) { this.ui.openPanel(this.ui._currentPanel === 'skills'    ? null : 'skills');    if (!this.ui._currentPanel) this.ui.closePanel('skills'); }
    if (this.ui.anyPanelOpen()) { this.input.flush(); return; }

    // ---- PLAYER MOVEMENT ----
    const dir = inp.move();
    if (dir !== 0) {
      p.facing = dir;
      p.vx = U.lerp(p.vx, dir * p.moveSpeed, 0.25);
      p.state = p.onGround ? 'walk' : p.state;
    } else {
      p.vx = U.lerp(p.vx, 0, 0.3);
      if (p.onGround && Math.abs(p.vx) < 0.3) p.state = 'idle';
    }

    if (inp.jump() && p.onGround) {
      p.vy = CFG.JUMP_FORCE;
      p.onGround = false;
      p.state = 'jump';
      this.audio.playSound('assets/audio/sounds/equip.wav', 0.2);
    }

    // Gravity
    p.vy = Math.min(p.vy + CFG.GRAVITY, CFG.MAX_FALL);

    // Move & collide
    p.x += p.vx;
    this._collideX(p, w);
    p.y += p.vy;
    this._collideY(p, w);

    // Clamp to world
    p.x = U.clamp(p.x, 0, w.W - p.w);
    p.y = U.clamp(p.y, 0, w.H - p.h);

    // ---- COMBAT ----
    if (p.attackCd > 0) p.attackCd--;
    if (p.skill1Cd > 0) p.skill1Cd--;
    if (p.skill2Cd > 0) p.skill2Cd--;
    if (p.invincible > 0) p.invincible--;
    if (p.berserk    > 0) p.berserk--;
    if (p.speedBoost > 0) p.speedBoost--;

    if (inp.attack() && p.attackCd <= 0) {
      this.meleeAttack(p, 0, 1.0, false);
      p.attackCd = Math.max(8, Math.floor(30 / (p.weaponDef?.spd || 1)));
      p.isAttacking = true;
      p.stateTimer  = 0;
    }
    if (p.isAttacking) { p.stateTimer++; if (p.stateTimer > 15) { p.isAttacking = false; p.attackBox = null; } }

    if (inp.skill1()) p.useSkill(1, this);
    if (inp.skill2()) p.useSkill(2, this);
    if (inp.heal())   p.useHeal(this);

    // Regen
    if (p.regenTimer > 0) {
      p.regenTimer--;
      p.hp = Math.min(p.maxHp, p.hp + (p.regenRate || 5) / 60);
    }

    // EP passive regen
    p.ep = Math.min(p.maxEp, p.ep + 0.03);

    // ---- ANIMATIONS ----
    p.animTimer++;

    // ---- ENEMIES UPDATE ----
    this._updateEnemies(w, p, dt);

    // ---- LOOT PICKUP ----
    this._checkLootPickup(w, p, inp);

    // ---- ZONE EXIT ----
    const dx = Math.abs(p.x - w.exitX), dy = Math.abs(p.y - w.exitY);
    if (dx < 60 && dy < 100) {
      this.ui.showInteractHint(true);
      if (inp.interact()) this._advanceZone();
    } else {
      this.ui.showInteractHint(false);
    }

    // ---- CAMERA ----
    this.camera.follow(p, w);

    // ---- UI UPDATE ----
    this.ui.updateHUD(p, w);
    this.ui.updateMinimap(w, p, w.enemies, this.camera);

    // ---- DEATH CHECK ----
    if (p.hp <= 0 && p.state !== 'dead') {
      p.state = 'dead';
      p.hp = 0;
      this._playerDied();
    }

    // Auto-save every 30 seconds
    if (Math.floor(p.playTime * 10) % 300 === 0) this.save();

    this.input.flush();
  }

  _collideX(p, w) {
    const T = CFG.TILE;
    const gr = w.groundY;
    // World boundary
    if (p.x < 0) { p.x = 0; p.vx = 0; }
    if (p.x + p.w > w.W) { p.x = w.W - p.w; p.vx = 0; }
    // Platforms
    for (const pl of w.platforms) {
      if (U.overlap({x:p.x,y:p.y+4,w:p.w,h:p.h-8}, pl)) {
        if (p.vx > 0) { p.x = pl.x - p.w; p.vx = 0; }
        else          { p.x = pl.x + pl.w; p.vx = 0; }
      }
    }
  }

  _collideY(p, w) {
    p.onGround = false;
    const gr = w.groundY;
    // Ground
    if (p.y + p.h >= gr) {
      p.y = gr - p.h;
      p.vy = 0;
      p.onGround = true;
    }
    // Platforms — only from above
    for (const pl of w.platforms) {
      const prevBot = p.y - p.vy + p.h;
      const curBot  = p.y + p.h;
      if (p.vy >= 0 && prevBot <= pl.y + 1 && curBot >= pl.y &&
          p.x + p.w - 4 > pl.x && p.x + 4 < pl.x + pl.w) {
        p.y = pl.y - p.h;
        p.vy = 0;
        p.onGround = true;
      }
    }
    // Ceiling
    if (p.y < 0) { p.y = 0; p.vy = 0; }
  }

  // ---- ENEMY UPDATE ----
  _updateEnemies(w, p, dt) {
    for (const e of w.enemies) {
      if (!e.alive) continue;
      if (!e._state) { e._state = 'patrol'; e._timer = 0; e._patrolDir = 1; e.facing = 1; e.hitFlash = 0; e.stunned = 0; e.regenCd = 0; }

      if (e.hitFlash > 0) e.hitFlash--;
      if (e.stunned  > 0) { e.stunned--; continue; }

      const dist = U.dist(e, { x: p.x + p.w/2, y: p.y + p.h/2 });
      const aggro = CFG.ENEMY_AGGRO * (e.boss ? 2 : 1);

      // Simple gravity / ground check
      if (!e._vy) e._vy = 0;
      e._vy = Math.min(e._vy + 0.3, 8);
      e.y += e._vy;
      if (e.y + e.size >= w.groundY) { e.y = w.groundY - e.size; e._vy = 0; }

      if (dist < aggro) {
        // Chase
        const dx = (p.x + p.w/2) - (e.x + e.size/2);
        const spd = e.spd * 0.8;
        e.x += dx > 0 ? spd : -spd;
        e.facing = dx > 0 ? 1 : -1;
        e._state = 'chase';

        // Attack player on contact
        const pRect = U.rectOf(p);
        const eRect = { x: e.x, y: e.y, w: e.size, h: e.size };
        if (U.overlap(pRect, eRect) && !e._atkTimer) {
          this._enemyAttack(e, p);
          e._atkTimer = 60;
        }
      } else {
        // Patrol
        e._timer++;
        if (e._timer > 80 + U.randInt(0, 40)) { e._patrolDir *= -1; e._timer = 0; }
        e.x += e._patrolDir * e.spd * 0.3;
        e.facing = e._patrolDir;
        e._state = 'patrol';
      }
      if (e._atkTimer > 0) e._atkTimer--;

      // Keep on ground
      e.x = U.clamp(e.x, 0, w.W - e.size);

      // Boss special: heal over time if far
      if (e.boss && e._state === 'patrol' && e._vy === 0) {
        e.hp = Math.min(e.maxHp, e.hp + 0.5);
      }
    }
  }

  _enemyAttack(e, p) {
    if (p.invincible > 0) return;
    const def = p.totalDef;
    let dmg = Math.max(1, e.atk - Math.floor(def * 0.5));
    // Shield absorb
    if (p.shieldHp > 0) {
      const absorbed = Math.min(p.shieldHp, dmg);
      p.shieldHp -= absorbed;
      dmg -= absorbed;
    }
    if (dmg <= 0) return;
    p.hp = Math.max(0, p.hp - dmg);
    p.invincible = 45;
    p.vx = -p.facing * 4;
    p.vy = -4;
    this.ui.spawnDamageNum(p.x + 14, p.y, '-' + dmg, 'player');
    this.camera.addShake(e.boss ? 8 : 4);
    this.screen.flash('#ff0000', 0.2);
    this.audio.playSound(e.boss ? 'assets/audio/sounds/hit1.wav' : 'assets/audio/sounds/hit2.wav', 0.5);
  }

  // ---- PLAYER ATTACKS ----
  meleeAttack(p, extraEp, mult, isSkill) {
    const T = CFG.TILE;
    const reach = 80 + (p.agi * 1.5);
    const atx = p.facing > 0 ? p.x + p.w : p.x - reach;
    const box = { x: atx, y: p.y + 4, w: reach, h: p.h - 8 };
    p.attackBox = box;

    let hit = 0;
    for (const e of this.world.enemies) {
      if (!e.alive) continue;
      if (!U.overlap(box, { x: e.x, y: e.y, w: e.size, h: e.size })) continue;
      const isCrit = Math.random() < p.critChance;
      let dmg = Math.floor(p.totalAtk * mult * (isCrit ? 2 : 1));
      dmg = Math.max(1, dmg - Math.floor(e.def * 0.4));
      this._applyDamageToEnemy(e, dmg, isCrit, p);
      hit++;
    }
    if (hit > 0) {
      this.audio.playSound(`assets/audio/sounds/hit${U.randInt(1,2)}.wav`, 0.5);
      this.camera.addShake(isSkill ? 5 : 2);
    }
  }

  aoeAttack(p, radius, dmg, stun = false) {
    const cx = p.x + p.w/2, cy = p.y + p.h/2;
    let hit = 0;
    for (const e of this.world.enemies) {
      if (!e.alive) continue;
      if (U.dist({ x: cx, y: cy }, { x: e.x + e.size/2, y: e.y + e.size/2 }) < radius) {
        const isCrit = Math.random() < p.critChance;
        this._applyDamageToEnemy(e, Math.floor(dmg * (isCrit ? 2 : 1)), isCrit, p);
        if (stun) e.stunned = 90;
        hit++;
      }
    }
    if (hit > 0) {
      this.camera.addShake(8);
      this.screen.flash('#ffaa00', 0.3);
      this.audio.playSound('assets/audio/sounds/hit1.wav', 0.7);
    }
  }

  rangedAttack(p, count, delay) {
    let shot = 0;
    const fire = () => {
      if (shot >= count || !this.world) return;
      const isCrit = Math.random() < p.critChance;
      let dmg = Math.floor(p.totalAtk * (isCrit ? 2 : 1));
      let hit = 0;
      for (const e of this.world.enemies) {
        if (!e.alive) continue;
        const dist = U.dist({ x: p.x + p.w/2, y: p.y }, { x: e.x + e.size/2, y: e.y });
        if (dist < 500) {
          dmg = Math.max(1, dmg - Math.floor(e.def * 0.3));
          this._applyDamageToEnemy(e, dmg, isCrit, p);
          hit++;
          if (hit >= 1) break;
        }
      }
      this.audio.playSound('assets/audio/sounds/blaster.wav', 0.35);
      shot++;
      if (shot < count) setTimeout(fire, delay);
    };
    fire();
  }

  empAllEnemies(stunMs) {
    for (const e of this.world.enemies) {
      if (!e.alive) continue;
      e.stunned = Math.floor(stunMs / 16.7);
    }
    this.screen.flash('#0088ff', 0.5);
  }

  _applyDamageToEnemy(e, dmg, isCrit, p) {
    e.hp -= dmg;
    e.hitFlash = 8;
    this.ui.spawnDamageNum(e.x + e.size/2, e.y, (isCrit ? '💥' : '') + dmg, isCrit ? 'crit' : 'enemy');

    if (e.hp <= 0) {
      e.alive = false;
      p.kills++;
      p.addXP(e.xp, this);
      p.gainGold(U.randInt(e.gold[0], e.gold[1]));
      this.audio.playSound('assets/audio/sounds/enemy_die.wav', 0.5);
      // Drop loot
      if (Math.random() < (e.boss ? 1 : 0.35)) {
        const lootPool = e.boss
          ? Object.keys(ITEMS_DB).filter(k => ['epic','legendary'].includes(ITEMS_DB[k].rarity))
          : Object.keys(ITEMS_DB);
        const dropId = lootPool[U.randInt(0, lootPool.length - 1)];
        this.world.loot.push({ itemId: dropId, x: e.x + e.size/2, y: e.y, taken: false, uid: 'drop_' + Date.now() });
      }
      if (e.boss) {
        this.screen.flash('#ffff00', 0.7);
        this.camera.addShake(20);
        this.audio.playSound('assets/audio/sounds/levelup.wav', 1);
        this.ui.addFloatText('BOSS DEFEATED!', p.x, p.y - 60, '#f1c40f');
      }
    }
  }

  _checkLootPickup(w, p, inp) {
    for (const loot of w.loot) {
      if (loot.taken) continue;
      const dist = U.dist({ x: p.x + p.w/2, y: p.y + p.h/2 }, { x: loot.x, y: loot.y });
      if (dist < 50) {
        if (inp.interact()) {
          this.pendingLoot = loot;
          this.ui.showLoot(loot);
        }
        return;
      }
    }
  }

  takeLoot() {
    if (!this.pendingLoot) return;
    const def = ITEMS_DB[this.pendingLoot.itemId];
    if (!def) { this.pendingLoot.taken = true; this.pendingLoot = null; return; }
    if (this.player.addItem(this.pendingLoot.itemId)) {
      this.pendingLoot.taken = true;
      this.audio.playSound('assets/audio/sounds/pickup.wav', 0.6);
      this.ui.addFloatText('+ ' + def.name, this.player.x, this.player.y - 40, '#f1c40f');
    }
    this.pendingLoot = null;
    document.getElementById('loot-popup').classList.add('hidden');
  }

  _advanceZone() {
    if (this.transitioning) return;
    const next = this.player.currentZone + 1;
    if (next >= CFG.ZONES) {
      this.ui.addFloatText('YOU WIN! GAME COMPLETE!', this.player.x, this.player.y - 60, '#f1c40f');
      return;
    }
    this.save();
    this._loadZone(next, false);
  }

  _playerDied() {
    this.player.deathCount++;
    this.audio.playSound('assets/audio/sounds/player_die.wav', 0.8);
    this.audio.stopMusic();
    this.screen.flash('#ff0000', 0.8);
    document.getElementById('gameover-stats').innerHTML = `
      Level: <b>${this.player.level}</b> | Kills: <b>${this.player.kills}</b><br>
      Zone: <b>${this.player.currentZone + 1} — ${ZONE_DEF[this.player.currentZone].name}</b><br>
      Deaths: <b>${this.player.deathCount}</b>
    `;
    setTimeout(() => this._showScreen('screen-gameover'), 1500);
  }

  respawn() {
    this.player.hp = Math.floor(this.player.maxHp * 0.5);
    this.player.ep = this.player.maxEp;
    this._loadZone(this.player.currentZone, false);
  }

  togglePause() {
    this.paused = !this.paused;
    const menu = document.getElementById('pause-menu');
    if (this.paused) menu.classList.remove('hidden');
    else             menu.classList.add('hidden');
  }

  quitToMenu() {
    this.save();
    this._stopLoop();
    this.paused = false;
    document.getElementById('pause-menu').classList.add('hidden');
    this.audio.stopMusic();
    this.showTitle();
    document.getElementById('btn-continue').style.display = 'block';
  }

  // ============================================================
  // RENDER
  // ============================================================
  render() {
    const s = this.screen;
    const w = this.world;
    const p = this.player;
    const c = this.camera;
    if (!w || !p || !c) return;

    s.clear('#000');
    s.drawBackground(w.zoneDef, c, 0.25);
    s.drawWorld(w, c);
    s.drawLoot(w.loot, c);
    s.drawEnemies(w.enemies, c);
    s.drawPlayer(p, c);
    s.drawExitPortal(w, c);
    s.applyFlash();
  }
}

// ============================================================
// BOOTSTRAP
// ============================================================
window.addEventListener('DOMContentLoaded', () => {
  const game = new Game();
  window._game = game; // debug access
  game.showTitle();

  // Check for existing save
  try {
    if (localStorage.getItem(CFG.SAVE_KEY)) {
      document.getElementById('btn-continue').style.display = 'block';
    }
  } catch(e) {}
});
