<?php

namespace Tests\Feature\Filament;

use App\Filament\Resources\GuideResource\Pages\CreateGuide;
use App\Filament\Resources\GuideResource\Pages\EditGuide;
use App\Models\Guide;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Livewire\Livewire;
use Tests\TestCase;

class GuideResourceTest extends TestCase
{
    use RefreshDatabase;

    protected User $admin;

    protected function setUp(): void
    {
        parent::setUp();
        $this->admin = User::factory()->create();
    }

    public function test_can_render_list_page(): void
    {
        $this->actingAs($this->admin, 'web')
            ->get(route('filament.admin.resources.guides.index'))
            ->assertSuccessful();
    }

    public function test_can_create_guide(): void
    {
        $this->actingAs($this->admin, 'web');

        Livewire::test(CreateGuide::class)
            ->fillForm([
                'title' => 'Test Guide',
                'description' => 'Test Description',
                'requirements' => ['req1' => 'desc1'],
                'step_by_step' => 'Test Steps',
                'estimated_time' => '1 day',
                'cost' => 'Rp 10.000,-',
                'tips' => 'Test Tips',
                'user_id' => $this->admin->id,
            ])
            ->call('create')
            ->assertHasNoFormErrors();

        $this->assertDatabaseHas('guides', [
            'title' => 'Test Guide',
        ]);
    }

    public function test_can_edit_guide(): void
    {
        $this->actingAs($this->admin, 'web');

        $guide = Guide::factory()->create();

        Livewire::test(EditGuide::class, ['record' => $guide->getRouteKey()])
            ->fillForm([
                'title' => 'Updated Guide',
                'description' => 'Updated Description',
                'requirements' => ['req2' => 'desc2'],
                'step_by_step' => 'Updated Steps',
                'estimated_time' => '2 days',
                'cost' => 'Rp 20.000,-',
                'tips' => 'Updated Tips',
            ])
            ->call('save')
            ->assertHasNoFormErrors();

        $this->assertDatabaseHas('guides', [
            'id' => $guide->id,
            'title' => 'Updated Guide',
        ]);
    }

    public function test_can_delete_guide(): void
    {
        $this->actingAs($this->admin, 'web');

        $guide = Guide::factory()->create();

        Livewire::test(EditGuide::class, ['record' => $guide->getRouteKey()])
            ->callAction('delete')
            ->assertHasNoErrors();

        $this->assertDatabaseMissing('guides', [
            'id' => $guide->id,
        ]);
    }
}