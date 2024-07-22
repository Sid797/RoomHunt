//src/app/api/houses/route.ts
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import fs from 'fs';
import path from 'path';

const DB_FILE_PATH = path.join(process.cwd(), 'temp_db.json');

// Helper function to read the JSON file
function readDB() {
  if (!fs.existsSync(DB_FILE_PATH)) {
    fs.writeFileSync(DB_FILE_PATH, JSON.stringify([]));
  }
  return JSON.parse(fs.readFileSync(DB_FILE_PATH, 'utf-8'));
}

// Helper function to write to the JSON file
function writeDB(data: any) {
  fs.writeFileSync(DB_FILE_PATH, JSON.stringify(data, null, 2));
}

export async function GET() {
  try {
    const houses = readDB();
    return NextResponse.json(houses);
  } catch (error) {
    console.error('Error fetching houses:', error);
    return NextResponse.json({ error: 'Failed to fetch houses' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const houses = readDB();
    const newHouse = { ...body, id: Date.now().toString() };
    houses.push(newHouse);
    writeDB(houses);
    return NextResponse.json(newHouse, { status: 201 });
  } catch (error) {
    console.error('Error adding house:', error);
    return NextResponse.json({ error: 'Failed to add house', details: (error as Error).message }, { status: 500 });
  }
}

// Commented out MongoDB code
/*
import dbConnect from '@/lib/dbConnect';
import House from '@/models/house';

export async function GET() {
  await dbConnect();
  try {
    const houses = await House.find({ forSale: true });
    return NextResponse.json(houses);
  } catch (error) {
    console.error('Error adding house:', error);
    return NextResponse.json({ error: 'Failed to fetch houses' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  await dbConnect();
  try {
    const body = await request.json();
    const newHouse = await House.create(body);
    return NextResponse.json(newHouse, { status: 201 });
  } catch (error) {
    console.error('Error adding house:', error);
    return NextResponse.json({ error: 'Failed to add house', details: error.message }, { status: 500 });
  }
}
*/