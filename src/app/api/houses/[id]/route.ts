//src/app/api/houses/[id]/route.ts

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

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const houses = readDB();
    const house = houses.find((house: any) => house.id === id);
    
    if (!house) {
      return NextResponse.json({ error: 'House not found' }, { status: 404 });
    }
    
    return NextResponse.json(house);
  } catch (error) {
    console.error('Error fetching house:', error);
    return NextResponse.json({ error: 'Failed to fetch house' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const houses = readDB();
    const index = houses.findIndex((house: any) => house.id === id);
    if (index === -1) {
      return NextResponse.json({ error: 'House not found' }, { status: 404 });
    }
    houses.splice(index, 1);
    writeDB(houses);
    return NextResponse.json({ message: 'House deleted successfully' });
  } catch (error) {
    console.error('Error deleting house:', error);
    return NextResponse.json({ error: 'Failed to delete house' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const body = await request.json();
    const houses = readDB();
    const index = houses.findIndex((house: any) => house.id === id);
    if (index === -1) {
      return NextResponse.json({ error: 'House not found' }, { status: 404 });
    }
    houses[index] = { ...houses[index], ...body };
    writeDB(houses);
    return NextResponse.json(houses[index]);
  } catch (error) {
    console.error('Error updating house:', error);
    return NextResponse.json({ error: 'Failed to update house' }, { status: 500 });
  }
}

// Commented out MongoDB code
/*
import dbConnect from '@/lib/dbConnect';
import House from '@/models/house';

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  await dbConnect();
  try {
    const { id } = params;
    const deletedHouse = await House.findByIdAndDelete(id);
    if (!deletedHouse) {
      return NextResponse.json({ error: 'House not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'House deleted successfully' });
  } catch (error) {
    console.error('Error adding house:', error);
    return NextResponse.json({ error: 'Failed to delete house' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  await dbConnect();
  try {
    const { id } = params;
    const body = await request.json();
    const updatedHouse = await House.findByIdAndUpdate(id, body, { new: true, runValidators: true });
    if (!updatedHouse) {
      return NextResponse.json({ error: 'House not found' }, { status: 404 });
    }
    return NextResponse.json(updatedHouse);
  } catch (error) {
    console.error('Error adding house:', error);
    return NextResponse.json({ error: 'Failed to update house' }, { status: 500 });
  }
}
*/