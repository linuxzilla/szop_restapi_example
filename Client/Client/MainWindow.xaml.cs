﻿using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;

namespace Client
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        private BookModel row = new BookModel();

        public MainWindow()
        {
            InitializeComponent();
            GridLogin.Visibility = Visibility.Visible;
            GridMenu.Visibility = Visibility.Hidden;
        }

        private void btLike_Click(object sender, RoutedEventArgs e)
        {
            if (row.Id != 0)
            {
                try
                {
                    ApiController.Like(row.Id);
                    Refresh();
                }
                catch (Exception ex)
                {
                    MessageBox.Show(ex.Message);
                }
            }
        }

        private void btRefresh_Click(object sender, RoutedEventArgs e)
        {
            try
            {
                Refresh();
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message);
            }
        }

        private void btLogout_Click(object sender, RoutedEventArgs e)
        {
            try
            {
                ApiController.Logout();
                row = null;
                tbUsername.Text = "";
                tbPassword.Password = "";
                GridLogin.Visibility = Visibility.Visible;
                GridMenu.Visibility = Visibility.Hidden;
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message);
            }
        }

        private void btDislike_Click(object sender, RoutedEventArgs e)
        {
            if (row.Id != 0)
            {
                try
                {
                    ApiController.DisLike(row.Id);
                    Refresh();
                }
                catch (Exception ex)
                {
                    MessageBox.Show(ex.Message);
                }
            }
        }

        private void btLogin_Click(object sender, RoutedEventArgs e)
        {
            try
            {
                ApiController.UserLogIn(tbUsername.Text, tbPassword.Password);
                Refresh();
                GridLogin.Visibility = Visibility.Hidden;
                GridMenu.Visibility = Visibility.Visible;
            }
            catch (WrongPasswordException)
            {
                MessageBox.Show("Hibás jelszó!");
            }
            catch (NoSuchUserException)
            {
                StringBuilder sb = new StringBuilder();
                sb.Append("Hibás felhasználó név!");
                sb.Append("\n");
                sb.Append("Vagy a felhasználó nem létezik!");
                MessageBox.Show(sb.ToString());
            }
            catch (UnknownApiErrorException ex)
            {
                MessageBox.Show(ex.Message);
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message);
            }
        }

        private void GridMenu_Loaded(object sender, RoutedEventArgs e)
        {
            cbGenres.ItemsSource = Enum.GetValues(typeof(Genres)).Cast<Genres>();
        }

        private void btAdd_Click(object sender, RoutedEventArgs e)
        {
            GridMenu.Visibility = Visibility.Hidden;
            GridAddBook.Visibility = Visibility.Visible;
        }


        private void btDelete_Click(object sender, RoutedEventArgs e)
        {
            MessageBoxResult result = MessageBox.Show("Biztos törölni szeretnéd ezt a könyvet ?", row.Title, MessageBoxButton.YesNo);
            switch (result)
            {
                case MessageBoxResult.Yes:
                    try
                    {
                        if (row.Id != 0)
                        {
                            ApiController.Delete(row.Id);
                            row = null;
                            Refresh();
                        }
                    }
                    catch (Exception ex)
                    {
                        MessageBox.Show(ex.Message);
                    }
                    break;
                case MessageBoxResult.No:
                    break;
                default:
                    break;
            }
        }

        private void dgList_MouseDoubleClick(object sender, MouseButtonEventArgs e)
        {
            row = (BookModel)dgList.SelectedItems[0];
            tbDesc.Text = row.Description;
            lbTitle.Content = row.Title;
            lbOriginalTitile.Content = row.OriginalTitle;
            lbAuthor.Content = row.Author;
            lbIsbn.Content = row.Isbn;
            lbPrice.Content = row.Price;
        }

        private void Refresh()
        {
            List<BookModel> books = ApiController.GetAllBooks();
            dgList.ItemsSource = books;
        }

        private void btRegistartion_Click(object sender, RoutedEventArgs e)
        {
            try
            {
                NewUserHelper newUser = new NewUserHelper();
                newUser.email = tbRegEmail.Text;
                newUser.username = tbRegUsername.Text;
                newUser.name = tbFullname.Text;
                newUser.password = tbPassword.Password;
                newUser.isAdmin = cbNewUserAdmin.IsEnabled;
                ApiController.Registration(newUser);
                GridRegistration.Visibility = Visibility.Hidden;
                GridLogin.Visibility = Visibility.Visible;
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message);
            }
        }

        private void btRegistartionFrom_Click(object sender, RoutedEventArgs e)
        {
            GridLogin.Visibility = Visibility.Hidden;
            GridMenu.Visibility = Visibility.Hidden;
            GridRegistration.Visibility = Visibility.Visible;
        }

        private void btRegistartionBack_Click(object sender, RoutedEventArgs e)
        {
            GridRegistration.Visibility = Visibility.Hidden;
            GridLogin.Visibility = Visibility.Visible;
        }

        private void btBackMainClick(object sender, RoutedEventArgs e)
        {
            GridAddBook.Visibility = Visibility.Hidden;
            GridMenu.Visibility = Visibility.Visible;
        }

        private void btAddNewBook_Click(object sender, RoutedEventArgs e)
        {
            try
            {
                //string tmpStrGenre = ((ComboBoxItem)(sender as ComboBox) cbGenres.SelectedItem).Content.ToString();
                //Genres tmpGenre = (Genres)Enum.Parse(typeof(Genres), tmpStrGenre, true);
                ApiController.Add(
                   //tmpGenre,
                   Genres.CLASSIC,
                   tbAddIsbn.Text,
                   tbAddTitle.Text,
                   tbAddTitleOriginal.Text,
                   //DateTime.ParseExact(tbAddDate.Text, "yyyy-MM-dd HH",
                   //                    System.Globalization.CultureInfo.InvariantCulture),
                   tbAddDate.Text,
                   tbAddAuthor.Text,
                   tbDesc.Text,
                   int.Parse(tbAddPrice.Text)
                    );
            }
            catch (Exception ex)
            {

                MessageBox.Show(ex.Message);
            }
        }
    }
}
