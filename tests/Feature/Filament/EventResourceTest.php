<?php

namespace Tests\Feature\Filament;

use App\Filament\Resources\EventResource;
use App\Models\Event;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Livewire\Livewire;
use Tests\TestCase;

class EventResourceTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->actingAs(User::factory()->create());
    }

    public function test_can_render_list_page()
    {
        Livewire::test(EventResource\Pages\ListEvents::class)->assertSuccessful();
    }

    public function test_can_create_event()
    {
        $newEvent = Event::factory()->make();

        Livewire::test(EventResource\Pages\CreateEvent::class)
            ->fillForm([
                'name' => $newEvent->name,
                'description' => $newEvent->description,
                'location' => $newEvent->location,
                'starts_at' => $newEvent->starts_at,
                'ends_at' => $newEvent->ends_at,
            ])
            ->call('create')
            ->assertHasNoFormErrors();

        $this->assertDatabaseHas('events', [
            'name' => $newEvent->name,
            'description' => $newEvent->description,
            'location' => $newEvent->location,
        ]);
    }

    public function test_can_edit_event()
    {
        $event = Event::factory()->create();
        $newEventData = Event::factory()->make();

        Livewire::test(EventResource\Pages\EditEvent::class, [
            'record' => $event->getRouteKey(),
        ])
            ->fillForm([
                'name' => $newEventData->name,
                'description' => $newEventData->description,
                'location' => $newEventData->location,
                'starts_at' => $newEventData->starts_at,
                'ends_at' => $newEventData->ends_at,
            ])
            ->call('save')
            ->assertHasNoFormErrors();

        $this->assertDatabaseHas('events', [
            'id' => $event->id,
            'name' => $newEventData->name,
            'description' => $newEventData->description,
            'location' => $newEventData->location,
        ]);
    }

    public function test_can_delete_event()
    {
        $event = Event::factory()->create();

        Livewire::test(EventResource\Pages\EditEvent::class, [
            'record' => $event->getRouteKey(),
        ])
            ->callAction('delete')
            ->assertHasNoErrors();

        $this->assertDatabaseMissing('events', [
            'id' => $event->id,
        ]);
    }
}