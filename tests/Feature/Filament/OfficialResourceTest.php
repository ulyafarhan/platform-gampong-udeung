<?php

namespace Tests\Feature\Filament;

use App\Filament\Resources\OfficialResource;
use App\Models\Official;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Livewire\Features\SupportFileUploads\TemporaryUploadedFile;
use Livewire\Livewire;
use Tests\TestCase;

class OfficialResourceTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->admin = User::factory()->create();
        $this->actingAs($this->admin);
    }

    public function test_can_render_list_page(): void
    {
        Livewire::test(OfficialResource\Pages\ListOfficials::class)->assertSuccessful();
    }

    public function test_can_create_official(): void
    {
        $newOfficial = Official::factory()->make();
        $fakePhoto = TemporaryUploadedFile::fake()->image('photo.jpg');

        Livewire::test(OfficialResource\Pages\CreateOfficial::class)
            ->fillForm([
                'name' => $newOfficial->name,
                'position' => $newOfficial->position,
                'photo' => $fakePhoto,
            ])
            ->call('create')
            ->assertHasNoFormErrors();

        $this->assertDatabaseHas('officials', [
            'name' => $newOfficial->name,
            'position' => $newOfficial->position,
        ]);
    }

    public function test_can_edit_official()
    {
        $official = Official::factory()->create();
        $newOfficialData = Official::factory()->make();
        $newFakePhoto = TemporaryUploadedFile::fake()->image('new_photo.jpg');

        Livewire::test(OfficialResource\Pages\EditOfficial::class, [
            'record' => $official->getRouteKey(),
        ])
            ->fillForm([
                'name' => $newOfficialData->name,
                'position' => $newOfficialData->position,
                'photo' => $newFakePhoto,
            ])
            ->call('save')
            ->assertHasNoFormErrors();

        $this->assertDatabaseHas('officials', [
            'id' => $official->id,
            'name' => $newOfficialData->name,
            'position' => $newOfficialData->position,
        ]);
    }

    public function test_can_delete_official()
    {
        $official = Official::factory()->create();

        Livewire::test(OfficialResource\Pages\EditOfficial::class, [
            'record' => $official->getRouteKey(),
        ])
            ->callAction('delete')
            ->assertHasNoErrors();

        $this->assertDatabaseMissing('officials', [
            'id' => $official->id,
        ]);
    }
}