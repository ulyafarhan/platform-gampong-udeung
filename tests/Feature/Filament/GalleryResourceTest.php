<?php

namespace Tests\Feature\Filament;

use App\Filament\Resources\GalleryResource\Pages\CreateGallery;
use App\Filament\Resources\GalleryResource\Pages\EditGallery;
use App\Filament\Resources\GalleryResource\Pages\ListGalleries;
use App\Models\Gallery;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Livewire\Livewire;
use Tests\TestCase;

class GalleryResourceTest extends TestCase
{
    use RefreshDatabase;

    protected User $admin;

    protected function setUp(): void
    {
        parent::setUp();
        $this->admin = User::factory()->create();
        $this->actingAs($this->admin);
    }

    public function test_can_render_list_page(): void
    {
        Livewire::test(ListGalleries::class)->assertSuccessful();
    }

    public function test_can_create_gallery(): void
    {
        $newGallery = Gallery::factory()->make();

        Livewire::test(CreateGallery::class)
            ->fillForm([
                'title' => $newGallery->title,
                'caption' => $newGallery->caption,
            ])
            ->call('create')
            ->assertHasNoFormErrors();

        $this->assertDatabaseHas('galleries', [
            'title' => $newGallery->title,
            'caption' => $newGallery->caption,
        ]);
    }

    public function test_can_edit_gallery(): void
    {
        $this->actingAs($this->admin);
        $gallery = Gallery::factory()->create();
        $newGalleryData = Gallery::factory()->make();

        Livewire::test(EditGallery::class, [
            'record' => $gallery->getRouteKey(),
        ])
            ->fillForm([
                'title' => $newGalleryData->title,
                'caption' => $newGalleryData->caption,
            ])
            ->call('save')
            ->assertHasNoFormErrors();

        $this->assertDatabaseHas('galleries', [
            'id' => $gallery->id,
            'title' => $newGalleryData->title,
            'caption' => $newGalleryData->caption,
        ]);
    }

    public function test_can_delete_gallery(): void
    {
        $this->actingAs($this->admin);
        $gallery = Gallery::factory()->create();

        Livewire::test(EditGallery::class, [
            'record' => $gallery->getRouteKey(),
        ])
            ->callAction('delete')
            ->assertHasNoErrors();

        $this->assertDatabaseMissing('galleries', [
            'id' => $gallery->id,
        ]);
    }
}