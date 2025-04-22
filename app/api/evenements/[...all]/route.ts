import { NextResponse } from 'next/server';
import prisma  from '@/lib/prisma'; // Adjust the import path as necessary

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('Received data:', body);

    const createdEvent = await prisma.evenement.create({
        data:{
            titre: body.title,
            slug: body.slug || body.title.toLowerCase().replace(/\s+/g, '-'), // Generate slug if not provided
            description: body.Description,
            codeAcces: body.secret || null,
            userId: body.userId, // Assuming userId is passed in the request body
        },
    });

    return NextResponse.json({ message: 'Event created successfully', data: createdEvent });
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json({ error: 'Failed to create event' }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const title = url.searchParams.get('title'); // Get the title from the query parameters
    const secret = url.searchParams.get('secret'); // Get the secret from the query parameters
    console.log('Received title:', title);
    console.log('Received secret:', secret);

    if (!title || !secret) {
      return NextResponse.json({ error: 'Title and secret are required' }, { status: 400 });
    }

    // Find the event by title
    const event = await prisma.evenement.findUnique({
      where: { id: title },
    });

    if (!event) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }

    // Check if the secret matches
    if (event.codeAcces !== secret) {
      return NextResponse.json({ error: 'Invalid secret code' }, { status: 401 });
    }

    // If everything is valid, return the event data
    return NextResponse.json({ success: true, message: 'Successfully joined the event', data: event });
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json({ error: 'Failed to fetch event' }, { status: 500 });
  }
}