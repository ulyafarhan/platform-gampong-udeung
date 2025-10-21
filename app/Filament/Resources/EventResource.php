<?php

namespace App\Filament\Resources;

use App\Filament\Resources\EventResource\Pages;
use App\Models\Event;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Notifications\Notification;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Validation\ValidationException;

class EventResource extends Resource
{
    protected static ?string $model = Event::class;
    protected static ?string $navigationIcon = 'heroicon-o-calendar-days';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('name')
                    ->required()
                    ->maxLength(255),
                Forms\Components\TextInput::make('location')
                    ->required()
                    ->maxLength(255),
                Forms\Components\DateTimePicker::make('starts_at')
                    ->required(),
                Forms\Components\DateTimePicker::make('ends_at')
                    ->after('starts_at'),
                Forms\Components\RichEditor::make('description')
                    ->columnSpanFull(),
                Forms\Components\Hidden::make('lock_version'),
                Forms\Components\FileUpload::make('attachments')
                    ->multiple()
                    ->storeFileNamesIn('attachment_file_names')
                    ->openable()
                    ->downloadable()
                    ->previewable()
                    ->directory('attachments')
                    ->reorderable()
                    ->appendFiles(),
            ])->statePath('data')
            ->model(Event::class)
            ->saving(function (Model $record, array $data) {
                if ($record->exists && $record->lock_version != $data['lock_version']) {
                    Notification::make()
                        ->title('Concurrent Modification')
                        ->body('Another user has modified this event. Please refresh and try again.')
                        ->danger()
                        ->send();
                    throw ValidationException::withMessages([
                        'lock_version' => 'The record has been modified by another user.',
                    ]);
                }

                if ($record->exists) {
                    $record->lock_version++;
                }

                $attachments = $data['attachments'];
                $attachmentFileNames = $data['attachment_file_names'];
                unset($data['attachments'], $data['attachment_file_names']);

                $record->user_id = auth()->id();
                $record->fill($data);

                $record->save();

                foreach ($attachments as $index => $path) {
                    $record->attachments()->create([
                        'path' => $path,
                        'name' => $attachmentFileNames[$index],
                    ]);
                }

                return $record;
            });
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('name')->searchable()->sortable(),
                Tables\Columns\TextColumn::make('location'),
                Tables\Columns\TextColumn::make('starts_at')->dateTime()->sortable(),
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ])
            ->paginated([10, 25, 50, 100, 'all']);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListEvents::route('/'),
            'create' => Pages\CreateEvent::route('/create'),
            'edit' => Pages\EditEvent::route('/{record}/edit'),
        ];
    }

    public static function getEloquentQuery(): Builder
    {
        return parent::getEloquentQuery()->where('user_id', auth()->id());
    }
}